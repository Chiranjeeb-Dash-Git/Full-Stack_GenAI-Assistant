<div align="center">
  <img src="https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Groq_API-FF5F1F?style=for-the-badge&logo=groq&logoColor=white" alt="Groq AI" />
  <img src="https://img.shields.io/badge/OpenAI_Whisper-412991?style=for-the-badge&logo=openai&logoColor=white" alt="Whisper" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<h1 align="center">🤖 Full-Stack GenAI Assistant</h1>

<div align="center">
  <a href="https://full-stack-gen-ai-assistant.vercel.app">
    <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-Click%20Here-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
</div>

---

## 1. Introduction
The **Full-Stack GenAI Assistant** is a premium, high-speed artificial intelligence console designed to deliver enterprise-grade multimodal AI workflows. Wrapped in a unique, responsive **"Neo-Brutalist Sketch"** user interface, it prioritizes maximum productivity and seamless user experience. By leveraging cutting-edge Large Language Models (LLaMA 3.3) via the Groq API, it offers near-instantaneous streaming interactivity, WhatsApp-style voice messaging, robust document processing, and dynamic prompt editing.

## 2. Use Cases
* **Rapid Research & Document Analysis:** Users can upload massive PDF reports or images; the assistant extracts the text and provides instant summaries or answers specific questions regarding the attached context.
* **Hands-Free Interactions:** Users in transit or busy environments can use WhatsApp-style voice notes to dictate complex prompts, allowing the AI to seamlessly transcribe and respond without requiring keyboard input.
* **Software Development Assistant:** Programmers can use the assistant to generate code, which is formatted with syntax highlighting and equipped with one-click local download functionality.
* **Creative Iteration:** Users can experiment with prompts, editing previous questions to branch out into new conversation timelines or intercepting commands (like `/image`) to generate inline visuals.

## 3. Industry Value
* **Unprecedented Speed (High ROI):** By utilizing Groq's LPU architecture, the assistant delivers responses at hundreds of tokens per second. This eliminates wait times, drastically improving operational efficiency for enterprise users.
* **Frictionless Accessibility:** The inclusion of native voice notes and live dictation lowers the barrier to entry, making advanced AI accessible to non-technical users or those requiring accessibility accommodations.
* **Cost-Effective Infrastructure:** Operating entirely on a Next.js serverless architecture (via Vercel) paired with cloud-based API endpoints reduces hosting overhead to virtually zero during idle times, offering immense scalability without infrastructure bottlenecks.

## 4. Target Roles
* **Software Engineers:** To quickly debug code, generate boilerplate, and download snippets locally.
* **Data Analysts & Researchers:** To parse heavy PDF documents and extract key insights instantly.
* **Content Creators & Marketers:** To rapidly iterate on copywriting prompts by utilizing the dynamic message editing and prompt branching.
* **Everyday Consumers:** To use as a highly responsive, aesthetically pleasing daily driver for general AI queries, utilizing voice notes for convenience.

## 5. Tech Stack and Rationale
* **Frontend Framework:** `Next.js 14`
  * *Rationale:* Provides App Router capabilities for seamless API integration, server-side rendering for performance, and effortless edge deployment on Vercel.
* **Styling Engine:** `Tailwind CSS v3`
  * *Rationale:* Allows for rapid, utility-first UI development to easily achieve the complex, high-contrast "Neo-Brutalist Sketch" aesthetic without bloated stylesheet files.
* **AI Inference Engine:** `Groq API (LLaMA 3.3 70B)`
  * *Rationale:* Groq’s Language Processing Units (LPUs) offer industry-leading inference speeds, creating a true real-time conversational experience that traditional GPU providers cannot match.
* **Speech-to-Text Layer:** `OpenAI Whisper API (via Groq)`
  * *Rationale:* Provides highly accurate, multilingual voice transcription that is far superior and more reliable than built-in browser dictation APIs.

## 6. Technologies Used & Technical Explanations
* **Next.js API Routes (Serverless Functions):** The backend logic (like `/api/chat` and `/api/transcribe`) is entirely decoupled into serverless functions. This ensures secure execution (hiding API keys) and rapid scaling.
* **Web MediaRecorder API:** Used on the frontend to capture raw microphone audio streams. The audio is bundled into `.webm` blobs and sent over the network to the backend for processing.
* **FormData & Buffer Streams:** Used to handle multipart file uploads seamlessly. Whether it is an image, a PDF, or an audio blob, the payload is serialized and parsed natively by the Next.js Node/Edge runtime.
* **PDF-Parse & FileReader APIs:** Implemented to extract raw text data from heavy document uploads natively in the browser and server, enabling the AI to "read" user files.
* **React Hooks (`useState`, `useEffect`, `useRef`):** Used extensively for state management—controlling the streaming text generation UI, managing chat history arrays, and attaching to DOM nodes (like auto-scrolling to the bottom of the chat).
* **Local Storage API:** Provides lightweight "Edge Memory," ensuring that when a user refreshes the page, their entire chat history is instantly rehydrated without the need for a heavy SQL database.

## 7. Core Functionalities
1. **Real-Time AI Streaming:** Token-by-token response generation that mimics human typing speed, providing instant feedback.
2. **WhatsApp-Style Voice Notes:** A microphone button that records audio payloads. Upon stopping, an audio player embeds into the chat while the Whisper API invisibly transcribes the text and fetches the AI's response.
3. **Live Dictation:** Alternative browser-native speech recognition for users who want to see their words typed out in the input box in real-time before sending.
4. **Multi-Modal OCR Document Context:** The ability to attach `.txt`, `.pdf`, or image files directly into the prompt box. The app scans the files and injects the context directly into the AI's memory matrix.
5. **Intelligent Prompt Branching:** Users can hover over any previous message they sent, click "Edit," rewrite their prompt, and submit. This erases the subsequent timeline and regenerates the response, allowing for seamless context correction.
6. **In-Chat Image Generation:** Support for commands like `/image [prompt]`, which intercepts the text and generates an inline illustration using Pollinations AI.
7. **Code Snippet Engine:** Auto-detects programming languages, applies syntax highlighting, and provides a UI button to download the code block as a local file.
8. **Dynamic Theme Switching:** A global state toggle that switches the entire Neo-Brutalist UI between Light Mode and Dark Mode by inverting root CSS variables.
9. **Persistent Memory Bank:** A left-hand sidebar that stores and organizes previous chat sessions dynamically, allowing users to rename, delete, or resume past conversations.

---

> **Developer:** Chiranjeeb Dash  
> **GitHub:** [Chiranjeeb-Dash-Git](https://github.com/Chiranjeeb-Dash-Git)  
> **Live Demo:** [https://full-stack-gen-ai-assistant.vercel.app](https://full-stack-gen-ai-assistant.vercel.app)
