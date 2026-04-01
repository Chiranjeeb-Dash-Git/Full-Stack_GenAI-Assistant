<div align="center">
  <img src="https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Groq_API-FF5F1F?style=for-the-badge&logo=groq&logoColor=white" alt="Groq AI" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<h1 align="center">🤖 Full-Stack GenAI Assistant</h1>

<p align="center">
  A premium, high-speed Artificial Intelligence console designed with a unique, responsive <strong>"Sketch" user interface</strong>. Engineered for maximum productivity, real-time streaming interactivity, and enterprise-level multimodal AI workflows.
</p>

<div align="center">

  [![Live Demo](https://img.shields.io/badge/🚀%20LIVE%20DEMO-Click%20Here-brightgreen?style=for-the-badge)](https://full-stack-gen-ai-assistant.vercel.app)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant)

</div>

---

## 🌐 Live Demo

> **🔗 [https://full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app)**

The application is fully deployed on Vercel with live AI streaming powered by Groq + LLaMA 3.3 (70B). No setup required — just open the link and start chatting!

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
- Groq API Key → [console.groq.com](https://console.groq.com)
- Tavily API Key (Optional for search)

### Frontend — Local Development
```bash
cd Frontend
npm install
# Create .env.local and add:
# GROK_API_KEY="your_groq_api_key_here"
npm run dev
```
*Platform deploys at `http://localhost:3000`*

### Backend — Optional Standalone Server
```bash
cd Backend
npm install
# Configure your .env
# GROK_API_KEY="..."
npm start
```
*Server boots on `http://localhost:5000`*

---

## 🌍 Deployment

This project is deployed on **Vercel** using the Next.js serverless architecture.

| Environment | URL |
|---|---|
| **Production** | [https://full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app) |
| **GitHub Repo** | [https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant](https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant) |

To deploy your own fork:
1. Fork this repository
2. Import into [Vercel](https://vercel.com/new)
3. Set **Root Directory** to `Frontend`
4. Set **Framework Preset** to `Next.js`
5. Add `GROK_API_KEY` as an Environment Variable
6. Click Deploy ✅

---

> **Developer:** Chiranjeeb Dash  
> **Launch:** APRIL 2026  
> **Live Demo:** [https://full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app)
