import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_MODEL_PREFERENCES = [
  process.env.GEMINI_MODEL,
  DEFAULT_GEMINI_MODEL,
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
].filter(Boolean);

let discoveredGeminiModel;

async function resolveGeminiModel(modelName) {
  const requested = modelName?.replace(/^models\//, "");
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY or GOOGLE_API_KEY is not configured.");

  // Prefer a configured/current model, but verify it against Google's live
  // model catalogue so retired IDs never take the whole chat service down.
  if (discoveredGeminiModel && (!requested || requested === discoveredGeminiModel)) {
    return discoveredGeminiModel;
  }

  const catalogResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!catalogResponse.ok) {
    throw new Error(`Gemini model catalogue unavailable (${catalogResponse.status}).`);
  }

  const catalog = await catalogResponse.json();
  const available = new Set((catalog.models || [])
    .filter(entry => entry.supportedGenerationMethods?.includes("generateContent"))
    .map(entry => entry.name?.replace(/^models\//, ""))
    .filter(Boolean));

  const requestedIsAvailable = requested && available.has(requested);
  const selected = requestedIsAvailable
    ? requested
    : GEMINI_MODEL_PREFERENCES.find(candidate => available.has(candidate));

  if (!selected) throw new Error("No Gemini generateContent model is available for this API key.");
  discoveredGeminiModel = selected;
  return selected;
}

async function generateGeminiResponse(messages, modelName) {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!geminiApiKey) throw new Error("GEMINI_API_KEY or GOOGLE_API_KEY is not configured.");

  const resolvedModel = await resolveGeminiModel(modelName);
  const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${geminiApiKey}`;

  const contents = messages
    .filter(m => m && (m.role === "user" || m.role === "assistant") && String(m.content || "").trim())
    .map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content) }]
    }));

  const res = await fetch(geminiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: "You are Full-Stack GenAI Assistant created by Chiranjeeb Dash. Be extremely helpful, direct, concise, and intelligent." }]
      }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini status ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini API.");
  return text;
}

export async function POST(req) {
  try {
    const { messages, model } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "At least one message is required." }, { status: 400 });
    }

    // Process PDF data if attached in messages
    const finalMessages = await Promise.all(messages.map(async (msg) => {
      if (typeof msg.content === "string" && msg.content.includes("data:application/pdf;base64,")) {
        try {
          const match = msg.content.match(/data:application\/pdf;base64,([a-zA-Z0-9+/=]+)/);
          if (match && match[1]) {
            const buffer = Buffer.from(match[1], "base64");
            let extractedText = "";
            try {
              const pdf = require("pdf-parse");
              const data = await pdf(buffer);
              extractedText = data.text;
            } catch (err) {
              extractedText = `[PDF processing notice: ${err.message}]`;
            }
            return {
              ...msg,
              content: msg.content.replace(/data:application\/pdf;base64,.*?\s/, `\n[EXTRACTED DOCUMENT DATA]:\n${extractedText}\n`)
            };
          }
        } catch (err) {
          console.error("PDF processing failure:", err.message);
        }
      }
      return msg;
    }));

    // Strategy 1: If requested Gemini or default model, try Gemini first
    if (model && (model.startsWith("gemini") || model.includes("gemini"))) {
      try {
        const text = await generateGeminiResponse(finalMessages, model);
        const encoder = new TextEncoder();
        return new NextResponse(new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }
        }), {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
          }
        });
      } catch (geminiError) {
        console.warn("Gemini execution failed, trying Groq fallback chain:", geminiError.message);
      }
    }

    // Strategy 2: Fall back to Groq API with valid active models
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      const groqClient = new Groq({ apiKey });
      const candidateModels = [process.env.GROQ_MODEL || "llama-3.3-70b-versatile"];

      for (const candidate of candidateModels) {
        try {
          const response = await groqClient.chat.completions.create({
            messages: [
              {
                role: "system",
                content: "You are Full-Stack GenAI Assistant created by Chiranjeeb Dash. Be extremely helpful, direct, concise, and intelligent."
              },
              ...finalMessages
            ],
            model: candidate,
            temperature: 0.7,
            max_completion_tokens: 1024,
            stream: true,
          });

          if (response) {
            const encoder = new TextEncoder();
            return new NextResponse(new ReadableStream({
              async start(controller) {
                try {
                  for await (const chunk of response) {
                    const content = chunk.choices[0]?.delta?.content || "";
                    if (content) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                    }
                  }
                } catch (e) {
                  console.error("Groq stream error:", e);
                } finally {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  controller.close();
                }
              }
            }), {
              headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
              }
            });
          }
        } catch (groqErr) {
          console.warn(`Groq candidate ${candidate} failed:`, groqErr.message);
        }
      }
    }

    // Strategy 3: Direct Gemini fallback if Groq failed or key wasn't available
    try {
      const text = await generateGeminiResponse(finalMessages, DEFAULT_GEMINI_MODEL);
      const encoder = new TextEncoder();
      return new NextResponse(new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      }), {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive"
        }
      });
    } catch (e) {
      console.error("All AI execution strategies failed:", e.message);
    }

    return NextResponse.json(
      { error: "No AI provider is available. Configure GEMINI_API_KEY (recommended) or GROQ_API_KEY in the deployment environment." },
      { status: 500 }
    );

  } catch (error) {
    console.error("Fatal chat error:", error);
    return NextResponse.json(
      { error: "AI service encountered an issue. Please retry." },
      { status: 500 }
    );
  }
}
