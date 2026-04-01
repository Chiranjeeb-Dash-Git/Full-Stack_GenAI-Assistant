<div align="center">
  <img src="https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Groq_API-FF5F1F?style=for-the-badge&logo=groq&logoColor=white" alt="Groq AI" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
</div>

<h1 align="center">🤖 Full-Stack GenAI Assistant</h1>

<p align="center">
  A premium, high-speed Artificial Intelligence console designed with a unique, responsive <strong>"Sketch" user interface</strong>. Engineered for maximum productivity, real-time streaming interactivity, and enterprise-level multimodal AI workflows.
</p>

---

## ✨ Flagship Capabilities

* 💬 **Real-time AI Streaming:** Lightning-fast token-by-token stream architecture leveraging LLaMA 3.3 (70B) via the highly performant Groq API.
* 🎙️ **Voice Intelligence (STT & TTS):** Speak commands seamlessly using native browser `SpeechRecognition`, and have answers dictated back effortlessly.
* 📂 **Multi-Modal Document Context (OCR):** Contextual depth! Upload multiple PDFs, texts, and explicit image buffers *concurrently* to analyze dense source material.
* 📝 **Intelligent Prompt Branching (Message Editing):** Change your mind and re-edit any previous text prompt on the fly, instantly erasing future nodes to fork an entirely new timeline.
* 🎨 **In-Chat Image Generation:** Seamlessly intercept the `/image [prompt]` command to render inline illustrations leveraging Pollinations AI. 
* 💻 **Code Snippet Engine:** Advanced Syntax Highlighting natively paired with a frictionless one-click local download feature for code blocks (`.js`, `.json`, `.py`, etc).
* 🌗 **Dynamic Theme Switching:** Integrated "Moon/Sun" toggle seamlessly inverts the custom-built sharp edge black/white Sketch design layout natively.
* 🛑 **Granular Output Control:** Total authority to Abort active AI streams dynamically, as well as a one-click Regenerate button to force an alternative response.
* 💾 **Persistent Edge Memory:** Robust long-term side-bar storage parsing full historical chats via `localStorage`.

---

## 🏗️ System Architecture

| Node           | Core Technology            |
|----------------|--------------------------|
| **Frontend**   | Next.js 14, React (Tailwind v3) |
| **Backend**    | Express.js, Node.js        |
| **AI Layer**   | Groq Cloud (LLaMA Series) |
| **File Parser**| PDF-Parse, FileReader API  |
| **Styling**    | Lucide-React, Architect's Daughter Font |

### 📁 Project Structure

```text
Full-Stack_GenAI-Assistant/
├── Frontend/           # Next.js 14 Interface Client
│   ├── app/            # App Router Core
│   ├── components/     # React Components & Toolboxes
│   └── globals.css     # Hardcoded Sketch UI Renderings
└── Backend/            # Express Stateless Server
    └── server.js       # Dynamic Model Routing & API Gateway
```

---

## 🚀 Quick Install

### Prerequisites
- Node.js `v18+`
- Groq API Key
- Tavily API Key (Optional for search)

### Backend Deployment
```bash
cd Backend
npm install
# Configure your .env
# GROK_API_KEY="..."
npm start
```
*Server boots on `http://localhost:5000`*

### Frontend Deployment
```bash
cd Frontend
npm install
npm run dev
```
*Platform deploys at `http://localhost:3000`*

---

> **Developer:** Chiranjeeb Dash  
> **Launch:** APRIL 2026
