import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

function resolveGeminiModel(modelName) {
  // Gemini 1.5 and 2.0 model IDs used by older versions of the UI are no
  // longer available for this API key. Keep those selections working by
  // routing them to the current stable Flash model.
  if (!modelName || modelName.startsWith("gemini-1.5") || modelName.startsWith("gemini-2.0") || modelName.startsWith("gemini-2.5")) {
    return DEFAULT_GEMINI_MODEL;
  }
  return modelName;
}

async function generateGeminiResponse(messages, modelName = DEFAULT_GEMINI_MODEL) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) throw new Error("GEMINI_API_KEY is not set.");

  const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${resolveGeminiModel(modelName)}:generateContent?key=${geminiApiKey}`;
  
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content || "") }]
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
    const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
    if (apiKey) {
      const groqClient = new Groq({ apiKey });
      const candidateModels = [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "llama3-70b-8192",
        "llama3-8b-8192"
      ];

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
      { error: "AI service is currently upgrading. Please try sending your message again in a moment." },
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
