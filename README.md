<div align="center">
  <img src="https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Groq_API-FF5F1F?style=for-the-badge&logo=groq&logoColor=white" alt="Groq AI" />
  <img src="https://img.shields.io/badge/OpenAI_Whisper-412991?style=for-the-badge&logo=openai&logoColor=white" alt="Whisper" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<h1 align="center">🤖 Full-Stack GenAI Assistant</h1>

<p align="center">
  A premium, high-speed Artificial Intelligence console designed with a unique, responsive <strong>"Neo-Brutalist Sketch" user interface</strong>. Engineered for maximum productivity, real-time streaming interactivity, and enterprise-level multimodal AI workflows.
</p>

<div align="center">
  <a href="https://full-stack-gen-ai-assistant.vercel.app">
    <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-Click%20Here-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
</div>

---

## 🌐 Live Application
> **[full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app)**  
> The application is fully deployed on Vercel with live AI streaming powered by Groq + LLaMA 3.3 (70B). No setup required — just open the link and start chatting!

---

## ✨ Flagship Capabilities

* 💬 **Real-time AI Streaming:** Lightning-fast token-by-token stream architecture leveraging LLaMA 3.3 (70B) via the highly performant Groq API.
* 🎙️ **WhatsApp-Style Voice Notes (NEW!):** Seamlessly send voice messages just like WhatsApp. Click the mic to record, and the app instantly embeds an audio player in the chat while using the **OpenAI Whisper API** via Groq to invisibly transcribe and fetch the AI's response!
* ⌨️ **Live Dictation:** Speak commands using native browser `SpeechRecognition` to watch your words type out in real-time.
* 📂 **Multi-Modal Document Context (OCR):** Contextual depth! Upload multiple PDFs, texts, and explicit image buffers *concurrently* to analyze dense source material.
* 📝 **Intelligent Prompt Branching:** Change your mind and re-edit any previous text prompt on the fly, instantly erasing future nodes to fork an entirely new conversation timeline.
* 🎨 **In-Chat Image Generation:** Seamlessly intercept the `/image [prompt]` command to render inline illustrations leveraging Pollinations AI.
* 💻 **Code Snippet Engine:** Advanced Syntax Highlighting natively paired with a frictionless one-click local download feature for code blocks.
* 🌗 **Dynamic Theme Switching:** Integrated "Moon/Sun" toggle seamlessly inverts the custom-built sharp edge black/white Neo-Brutalist design layout.
* 🛑 **Granular Output Control:** Total authority to Abort active AI streams dynamically, as well as a one-click Regenerate button to force alternative responses.
* 💾 **Persistent Edge Memory:** Robust long-term side-bar storage parsing full historical chats via local storage.

---

## 🏗️ System Architecture

| Node | Core Technology |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router) |
| **Styling Engine** | Tailwind CSS v3, Custom Neo-Brutalist CSS |
| **AI Text Layer** | Groq Cloud (LLaMA 3.3 70B Versatile) |
| **Speech-to-Text** | OpenAI Whisper API (via Groq), Web Speech API |
| **File Parser** | PDF-Parse, FileReader API |
| **Iconography & Fonts** | Lucide-React, Architect's Daughter, JetBrains Mono |

### 📁 Project Structure

```text
Full-Stack_GenAI-Assistant/
├── Frontend/                 # Next.js 14 Interface Client
│   ├── app/                  # App Router Core
│   │   ├── api/transcribe/   # Whisper API Endpoint
│   │   └── api/chat/         # Main Intelligence Endpoint
│   ├── components/           # React Components & Toolboxes
│   └── globals.css           # Hardcoded Sketch UI Renderings
└── Backend/                  # Optional Express Server (Legacy)
```

---

## 🚀 Quick Install

### Prerequisites
- Node.js `v18+`
- **Groq API Key** → Get it free at [console.groq.com](https://console.groq.com)

### Local Development Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant.git
   cd Full-Stack_GenAI-Assistant/Frontend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**  
   Create a `.env.local` file in the `Frontend` directory and add your API keys:
   ```env
   GROK_API_KEY="your_groq_api_key_here"
   ```
4. **Boot the Development Server:**
   ```bash
   npm run dev
   ```
   *The platform is now live at [http://localhost:3000](http://localhost:3000)*

---

## 🌍 Vercel Deployment

This project is deeply optimized for serverless edge deployment on **Vercel**.

1. Fork this repository.
2. Import your fork into [Vercel](https://vercel.com/new).
3. Set the **Root Directory** to `Frontend`.
4. The **Framework Preset** should automatically detect `Next.js`.
5. Add your `GROK_API_KEY` to the Environment Variables settings.
6. Click **Deploy** ✅.

---

> **Developer:** Chiranjeeb Dash  
> **GitHub:** [Chiranjeeb-Dash-Git](https://github.com/Chiranjeeb-Dash-Git)  
> **Live Demo:** [https://full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app)
