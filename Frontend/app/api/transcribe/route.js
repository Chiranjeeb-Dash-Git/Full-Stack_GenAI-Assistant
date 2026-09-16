import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
const client = apiKey ? new Groq({ apiKey }) : null;

export async function POST(req) {
  try {
    if (!client) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY environment variable." }, { status: 503 });
    }
    const formData = await req.formData();
    const file = formData.get("audio");

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const transcription = await client.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
