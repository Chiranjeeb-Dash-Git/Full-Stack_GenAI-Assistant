import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
const client = apiKey ? new Groq({ apiKey }) : null;

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    if (!client) {
      return NextResponse.json(
        { error: "API key is missing or invalid." },
        { status: 503 }
      );
    }

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

    // Candidate models to attempt in order of preference
    const candidateModels = [
      "qwen/qwen3.8-27b",
      "groq/compound",
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile"
    ];

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
    console.error("Groq API error:", error);
    return NextResponse.json(
      { error: error?.error?.message || error?.message || "Failed to generate AI response." },
      { status: 500 }
    );
  }
}
