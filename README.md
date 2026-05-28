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

---

> **Developer:** Chiranjeeb Dash  
> **GitHub:** [Chiranjeeb-Dash-Git](https://github.com/Chiranjeeb-Dash-Git)  
> **Live Demo:** [https://full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app)

---

## 📖 Complete Project Documentation

### 1. Introduction
The **Full-Stack GenAI Assistant** is a premium, high-speed artificial intelligence console designed to deliver enterprise-grade multimodal AI workflows. Wrapped in a unique, responsive **"Neo-Brutalist Sketch"** user interface, it prioritizes maximum productivity and seamless user experience. By leveraging cutting-edge LLaMA 3.3 models via the Groq API, it offers near-instantaneous streaming interactivity, WhatsApp-style voice messaging, robust document processing, and dynamic prompt editing.

### 2. Use Cases
* **Rapid Research & Document Analysis:** Upload massive PDFs or images; the assistant extracts the text and provides instant summaries or answers specific questions about the content.
* **Hands-Free Interactions:** Use WhatsApp-style voice notes to dictate complex prompts — the AI transcribes and responds without any keyboard input.
* **Software Development Assistant:** Generate code formatted with syntax highlighting and download it locally in one click.
* **Creative Iteration:** Edit past messages to branch the conversation into entirely new directions, or intercept `/image` commands to generate inline visuals.

### 3. Industry Value
* **Unprecedented Speed:** Groq's LPU architecture delivers responses at hundreds of tokens per second, eliminating wait times entirely.
* **Frictionless Accessibility:** Voice notes and live dictation remove the friction of typing, making AI accessible to all users including those with accessibility needs.
* **Cost-Efficient at Scale:** Built entirely on Next.js serverless architecture — zero idle server costs, infinite scalability via Vercel's edge network.

### 4. Target Roles
* **Software Engineers** — Debug code, generate boilerplate, download code snippets locally.
* **Data Analysts & Researchers** — Parse heavy PDF documents and extract key insights instantly.
* **Content Creators & Marketers** — Rapidly iterate on prompts using message editing and conversation branching.
* **Everyday Consumers** — A beautiful, fast, and responsive daily AI companion with voice-first design.

### 5. Tech Stack & Rationale

| Technology | Rationale |
|---|---|
| **Next.js 14** | App Router for secure API routing, SSR performance, and effortless Vercel deployment |
| **Tailwind CSS v3** | Rapid utility-first styling to achieve the complex Neo-Brutalist UI without CSS bloat |
| **Groq API (LLaMA 3.3 70B)** | Industry-leading LPU inference speed for a true real-time conversational experience |
| **OpenAI Whisper (via Groq)** | Highly accurate, multilingual transcription far superior to browser-native speech APIs |
| **PDF-Parse + FileReader** | Native document extraction enabling the AI to "read" any file format uploaded by the user |

### 6. Technologies & How They Work
* **Next.js API Routes (Serverless):** `/api/chat` and `/api/transcribe` run as secure serverless functions, hiding API keys and scaling automatically.
* **Web MediaRecorder API:** Captures raw microphone audio streams on the frontend, bundles them into `.webm` blobs, and sends them to the Whisper backend.
* **FormData & Buffer Streams:** Handles multipart file uploads (images, PDFs, audio blobs) serialized and parsed natively by the Next.js Node runtime.
* **React Hooks:** `useState`, `useEffect`, `useRef` manage streaming UI state, chat history arrays, and DOM interactions like auto-scrolling.
* **Local Storage API:** Lightweight "Edge Memory" — the entire chat history is saved and instantly rehydrated on page load without any database.

### 7. Core Functionalities
1. 🎙️ **WhatsApp-Style Voice Notes** — Record audio, send it; an audio player embeds in the chat while Whisper transcribes and the AI responds.
2. 💬 **Real-Time AI Streaming** — Token-by-token response generation with instant visual feedback.
3. 📂 **Multi-Modal Document Context** — Attach `.txt`, `.pdf`, or image files; the app injects the extracted content directly into the AI's context.
4. 📝 **Intelligent Prompt Branching** — Edit any past message to erase the subsequent conversation and generate an entirely new response path.
5. 🎨 **In-Chat Image Generation** — Type `/image [prompt]` to generate and render inline illustrations using Pollinations AI.
6. 💻 **Code Snippet Engine** — Auto-detects languages, applies syntax highlighting, and provides one-click file download for any code block.
7. 🌗 **Dynamic Theme Switching** — Toggle between Light and Dark modes via a global CSS variable inversion.
8. 🛑 **Granular Output Control** — Abort any active stream mid-generation, or regenerate an alternative response with one click.
9. 💾 **Persistent Memory Bank** — Sidebar with full session history; rename, delete, or resume any past conversation.

