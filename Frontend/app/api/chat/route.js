import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const client = new Groq({
  apiKey: process.env.GROK_API_KEY,
});

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    // 1. Context injection (Weather - Bhubaneswar Specific)
    let weatherData = "Weather data currently unavailable.";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const weatherRes = await fetch("https://wttr.in/Bhubaneswar?format=3", { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (weatherRes.ok) {
        weatherData = await weatherRes.text();
      }
    } catch (e) {
      console.error("Weather fetch failed:", e.message);
    }

    // 2. Intelligent Message Pre-processing (PDF Scanning)
    const finalMessages = await Promise.all(messages.map(async (msg) => {
      if (typeof msg.content === "string" && msg.content.includes("data:application/pdf;base64,")) {
        try {
          const match = msg.content.match(/data:application\/pdf;base64,([a-zA-Z0-9+/=]+)/);
          if (match && match[1]) {
            const buffer = Buffer.from(match[1], "base64");
            
            // Failsafe Dynamic Loader
            let extractedText = "[Parsing Engine Temporarily Offline - Retrying...]";
            try {
              const pdf = require("pdf-parse"); // JIT runtime loader
              const data = await pdf(buffer);
              extractedText = data.text;
            } catch (err) {
              console.error("PDF engine failure:", err.message);
              // Fallback: If parsing fails, don't crash the server.
              extractedText = `[Parsing failure: ${err.message}] Use vision or OCR fallback.`;
            }

            return { 
              ...msg, 
              content: msg.content.replace(/data:application\/pdf;base64,.*?\s/, `\n[EXTRACTED DOCUMENT DATA]:\n${extractedText}\n`) 
            };
          }
        } catch (err) {
          console.error("Message processing failure:", err.message);
        }
      }
      return msg;
    }));

    // 3. Selection of Intelligence Model
    const lastMsg = messages[messages.length - 1];
    const isVision = Array.isArray(lastMsg.content) && lastMsg.content.some(c => c.type === 'image_url');
    // Using Llama 4 Scout for vision and Llama 3.3 for ultra-fast text
    const targetModel = isVision ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile";

    // 4. Intelligence Execution
    const response = await client.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are Full-Stack GenAI Assistant.
- CREATOR: If asked who created you, say: "I am created by Chiranjeeb Dash."
- CREATION DATE: March 2026.
- IDENTITY: Extremely concise, direct, and professional.
- MISSION: Answer queries immediately without lengthy introductions.
- CONCISENESS: Be very brief. Never provide lists of "What I can do" unless specifically asked.
- GREETINGS: Keep greetings to a single short sentence.
- FORMAT: Avoid unnecessary headers or boilerplate sections.`
        },
        ...finalMessages
      ],
      model: targetModel,
      temperature: 0.7,
      stream: true,
    });

    const encoder = new TextEncoder();
    return new NextResponse(new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
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
    console.error("Critical System failure:", error.message);
    // Absolute Failsafe Response
    return new NextResponse(JSON.stringify({ error: "System Core Offline. Retrying boot sequence..." }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
