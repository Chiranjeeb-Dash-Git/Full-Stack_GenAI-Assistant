import { NextResponse } from "next/server";

// Browser SpeechSynthesis is the default provider so TTS works without a paid
// API key. A cloud provider can replace this adapter later without changing
// the chat UI or its settings contract.
export async function POST(req) {
  try {
    const { text, voiceGender = "female", language = "auto" } = await req.json();

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    if (!["male", "female"].includes(voiceGender)) {
      return NextResponse.json({ error: "voiceGender must be male or female." }, { status: 400 });
    }

    if (!["auto", "en", "hi"].includes(language)) {
      return NextResponse.json({ error: "language must be auto, en, or hi." }, { status: 400 });
    }

    return NextResponse.json({
      provider: "browser",
      message: "Use the browser SpeechSynthesis API for playback.",
      text: text.trim(),
      voiceGender,
      language,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid TTS request." }, { status: 400 });
  }
}
