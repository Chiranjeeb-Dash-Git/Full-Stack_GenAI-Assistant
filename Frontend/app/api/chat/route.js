import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
const client = apiKey ? new Groq({ apiKey }) : null;
const geminiApiKey = process.env.GEMINI_API_KEY;

export const runtime = 'nodejs';

async function generateGeminiStream(messages, geminiModel = "gemini-1.5-flash") {
  const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${geminiApiKey}`;
  
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content || "" }]
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
    throw new Error(`Gemini API returned ${res.status}: ${errText}`);
  }

  return res.body;
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

    // Check if requested model is Gemini
    const isGeminiRequested = model && (model.startsWith("gemini") || model.includes("gemini"));

    if (isGeminiRequested && geminiApiKey) {
      try {
        const geminiStream = await generateGeminiStream(finalMessages, model === "gemini-2.0-flash" ? "gemini-2.0-flash" : "gemini-1.5-flash");
        const encoder = new TextEncoder();
        const reader = geminiStream.getReader();
        const decoder = new TextDecoder();

        return new NextResponse(new ReadableStream({
          async start(controller) {
            let buffer = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";
                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    try {
                      const parsed = JSON.parse(line.slice(6));
                      const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || "";
                      if (text) {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
                      }
                    } catch (_) {}
                  }
                }
              }
            } catch (e) {
              console.error("Gemini stream reading error:", e);
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
      } catch (geminiErr) {
        console.warn("Gemini requested model failed, falling back to Groq:", geminiErr.message);
      }
    }

    if (!client) {
      return NextResponse.json(
        { error: "Groq & Gemini API keys are missing or invalid." },
        { status: 503 }
      );
    }

    // Candidate models: use user-selected model first, then fallbacks
    const fallbackModels = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "llama3-70b-8192",
      "deepseek-r1-distill-llama-70b"
    ];
    const candidateModels = model && !isGeminiRequested
      ? [model, ...fallbackModels.filter(m => m !== model)]
      : fallbackModels;

    let response = null;
    let lastError = null;

    for (const modelCandidate of candidateModels) {
      try {
        response = await client.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are Full-Stack GenAI Assistant created by Chiranjeeb Dash.
- Be extremely helpful, direct, concise, and intelligent.
- Answer user questions naturally and accurately without unnecessary boilerplate.`
            },
            ...finalMessages
          ],
          model: modelCandidate,
          temperature: 0.7,
          max_completion_tokens: 1024,
          stream: true,
        });
        if (response) break;
      } catch (err) {
        console.warn(`Model ${modelCandidate} failed:`, err?.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("All AI models failed to respond.");
    }

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
          console.error("Stream chunk error:", e);
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

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error?.error?.message || error?.message || "Failed to generate AI response." },
      { status: 500 }
    );
  }
}
