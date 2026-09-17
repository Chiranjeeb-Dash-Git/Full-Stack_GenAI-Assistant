"use client";

import { useState, useRef, useEffect } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Auth from "../components/Auth";
import {
  Send,
  Trash2,
  Plus,
  X,
  Paperclip,
  Bot,
  Loader2,
  Image as ImageIcon,
  FileText,
  Menu,
  Clock,
  Search,
  MessageSquare,
  LogOut,
  Mic,
  MicOff,
  Volume2,
  Edit2,
  RotateCcw,
  StopCircle,
  ChevronDown,
  Moon,
  Sun,
  Pause,
  Play,
  Square,
  Settings,
  SlidersHorizontal,
  Home as HomeIcon
} from "lucide-react";

function LandingPage({ onLaunch }) {
  const visualRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const visual = visualRef.current;
    const cards = cardsRef.current?.querySelectorAll(".landing-card") || [];
    const onScroll = () => {
      const y = window.scrollY;
      document.querySelectorAll(".landing-orb-wrap").forEach(orb => {
        const speed = Number(orb.dataset.speed || 0.2);
        orb.style.transform = `translate3d(0, ${y * speed * -0.3}px, 0)`;
      });
      if (visual) {
        const rotate = Math.min(y * 0.05, 18);
        visual.style.transform = `rotateY(${rotate}deg) rotateX(${-rotate * 0.4}deg)`;
      }
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    cards.forEach(card => observer.observe(card));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const capabilities = [
    ["⚡", "Real-time streaming", "Answers arrive token by token over Groq inference — no spinners, no waiting."],
    ["🎙", "Voice in, voice out", "Record like a voice note; Whisper transcribes it, and the console can speak its reply back."],
    ["📄", "Document intelligence", "Drop in PDFs, text, or images and the assistant reasons across all of it together."],
    ["🌿", "Prompt branching", "Edit an earlier message to fork the conversation cleanly down a new path."],
    ["✦", "In-chat imagery", "Type /image and get an illustration rendered straight into the thread."],
    ["◐", "Persistent memory", "Every conversation is saved, renamable, and resumes exactly where it left off."],
  ];

  return (
    <main className="landing-shell">
      <div className="landing-field" aria-hidden="true">
        <div className="landing-orb-wrap landing-o1" data-speed=".15"><div className="landing-orb" /></div>
        <div className="landing-orb-wrap landing-o2" data-speed=".3"><div className="landing-orb" /></div>
        <div className="landing-orb-wrap landing-o3" data-speed=".45"><div className="landing-orb" /></div>
        <div className="landing-orb-wrap landing-o4" data-speed=".2"><div className="landing-orb" /></div>
      </div>

      <header className="landing-header">
        <div className="landing-brand"><span className="landing-brand-mark" /> Full-Stack GenAI Assistant</div>
        <nav className="landing-nav">
          <a href="#capabilities">Capabilities</a>
          <a href="#voice">Voice</a>
          <a href="#stack">Stack</a>
          <button onClick={onLaunch} className="landing-nav-cta">Launch App</button>
        </nav>
      </header>

      <section className="landing-hero">
        <div>
          <div className="landing-eyebrow">Qwen 3.8 · Groq LPU Inference</div>
          <h1>Intelligence, <em>rendered</em><br />in real time.</h1>
          <p className="landing-lede">A full-stack AI console built for instant, streaming conversation — type, upload, or speak, and watch every answer arrive as it&apos;s thought.</p>
          <div className="landing-ctas">
            <button onClick={onLaunch} className="landing-btn landing-primary">Open the console <span>→</span></button>
            <a href="https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant" target="_blank" rel="noreferrer" className="landing-btn landing-ghost">View source</a>
          </div>
        </div>
        <div className="landing-visual" ref={visualRef}>
          <div className="landing-ring landing-ring-two" />
          <div className="landing-ring landing-ring-one" />
          <div className="landing-sphere" />
          <div className="landing-float landing-float-one"><span /> <b>Streaming</b>&nbsp; live</div>
          <div className="landing-float landing-float-two"><span /> Voice reply <b>ready</b></div>
        </div>
      </section>

      <div className="landing-marquee"><div><span>Streaming replies</span><span>Voice in &amp; out</span><span>Document intelligence</span><span>Image generation</span><span>Persistent memory</span><span>Streaming replies</span><span>Voice in &amp; out</span><span>Document intelligence</span></div></div>

      <section id="capabilities">
        <div className="landing-section-head"><div className="landing-eyebrow">Capabilities</div><h2>One continuous workspace, not six bolted-on tools.</h2><p>Every feature below lives inside the same conversation thread.</p></div>
        <div className="landing-grid" ref={cardsRef}>{capabilities.map(([icon, title, description], index) => <article className="landing-card" key={title} style={{ transitionDelay: `${(index % 3) * 90}ms` }}><div className="landing-card-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section id="voice">
        <div className="landing-voice-section"><div className="landing-voice-wrap"><div className="landing-waveform">{[40, 75, 100, 55, 88, 35, 95, 60, 78, 45, 65].map((height, i) => <span key={i} style={{ height: `${height}%`, animationDelay: `${i / 10}s` }} />)}</div><div className="landing-voice-copy"><h2>Talk to it. It talks back.</h2><p>Say something and the console transcribes, replies in text, and speaks the answer aloud — choose the voice and language.</p><div className="landing-tags"><span>EN — English</span><span>HI — हिंदी</span><span>Male / Female voice</span><span>Play · Pause · Seek · Volume</span></div></div></div></div>
      </section>

      <section id="stack"><div className="landing-stats"><div><strong>Qwen</strong><small>multimodal inference</small></div><div><strong>&lt;1s</strong><small>first-token latency</small></div><div><strong>2</strong><small>voice languages</small></div><div><strong>∞</strong><small>saved sessions</small></div></div></section>

      <section><div className="landing-final"><h2>Your next conversation is already streaming.</h2><div className="landing-ctas"><button onClick={onLaunch} className="landing-btn landing-final-primary">Open the console</button><a href="https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant" target="_blank" rel="noreferrer" className="landing-btn landing-final-ghost">Read the source</a></div></div></section>
      <footer className="landing-footer"><span>Full-Stack GenAI Assistant — Built by Chiranjeeb Dash</span><a href="https://github.com/Chiranjeeb-Dash-Git/Full-Stack_GenAI-Assistant" target="_blank" rel="noreferrer">github.com/Chiranjeeb-Dash-Git</a></footer>
    </main>
  );
}

export default function Home() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState(true);
  const [user, setUser] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedModel, setSelectedModel] = useState("qwen/qwen3.8-27b");
  const [isListening, setIsListening] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editChatTitle, setEditChatTitle] = useState("");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [chatSearch, setChatSearch] = useState("");
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    gender: "female",
    language: "auto",
    rate: 1,
    volume: 1,
  });
  const [voicesReady, setVoicesReady] = useState(false);
  const [speechState, setSpeechState] = useState({
    key: null,
    text: "",
    isPaused: false,
    progress: 0,
  });
  const [microphoneError, setMicrophoneError] = useState("");
  
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [editingMessageContent, setEditingMessageContent] = useState("");

  const removeAttachedFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submitEditedMessage = (index) => {
    if (isRequestActive.current) return;
    const newMessagesForUI = messages.slice(0, index);
    const editedMsgForUI = { role: "user", content: editingMessageContent };
    const apiPayload = { messages: [...newMessagesForUI, editedMsgForUI] };
    const initialMessagesForUI = [...newMessagesForUI, editedMsgForUI];
    setEditingMessageIndex(null);
    runAssistantFetch(apiPayload, initialMessagesForUI);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isRequestActive = useRef(false);
  const abortControllerRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechRef = useRef(null);
  const speechTextRef = useRef("");
  const speechKeyRef = useRef(null);
  const speechOffsetRef = useRef(0);
  const voiceSettingsLoadedKeyRef = useRef(null);
  const voiceFinalTranscriptRef = useRef("");
  const voiceLiveTranscriptRef = useRef("");
  const audioContextRef = useRef(null);
  const silenceCheckRef = useRef(null);
  const speechDetectedRef = useRef(false);
  const recordingStartedAtRef = useRef(0);

  const getStorageKey = () => `chat_history_${user?.email || "guest"}`;
  const getVoiceStorageKey = () => `voice_settings_${user?.email || "guest"}`;

  useEffect(() => {
    const key = getVoiceStorageKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setVoiceSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (error) {
        console.warn("Unable to load voice settings", error);
      }
    }
    voiceSettingsLoadedKeyRef.current = key;
  }, [user]);

  useEffect(() => {
    const key = getVoiceStorageKey();
    if (voiceSettingsLoadedKeyRef.current === key) {
      localStorage.setItem(key, JSON.stringify(voiceSettings));
    }
  }, [voiceSettings, user]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const markVoicesReady = () => setVoicesReady(window.speechSynthesis.getVoices().length > 0);
    markVoicesReady();
    window.speechSynthesis.addEventListener("voiceschanged", markVoicesReady);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", markVoicesReady);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Load chats whenever the user changes
  useEffect(() => {
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      setChats(parsed);
      if (parsed.length > 0) {
        setCurrentChatId(parsed[0].id);
        setMessages(parsed[0].messages);
      } else {
        setMessages([]);
        setCurrentChatId(null);
      }
    } else {
      setChats([]);
      setMessages([]);
      setCurrentChatId(null);
    }
  }, [user]);

  // Save current messages to the active chat in LocalStorage
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      setChats(prev => {
        const exists = prev.find(c => c.id === currentChatId);
        if (!exists) return prev;
        const updated = prev.map(c =>
          c.id === currentChatId ? { ...c, messages, lastUpdated: Date.now() } : c
        );
        localStorage.setItem(getStorageKey(), JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, currentChatId, user]);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat = { id: newId, title: "New Session", messages: [], lastUpdated: Date.now() };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setCurrentChatId(newId);
    setMessages([]);
    localStorage.setItem(getStorageKey(), JSON.stringify(updatedChats));
  };

  const deleteChat = (e, id) => {
    e.stopPropagation();
    const updated = chats.filter(c => c.id !== id);
    setChats(updated);
    localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    if (currentChatId === id) {
      if (updated.length > 0) {
        setCurrentChatId(updated[0].id);
        setMessages(updated[0].messages);
      } else {
        createNewChat();
      }
    }
  };

  const selectChat = (chat) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    setSidebarOpen(false);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processAudioBlob = async (audioBlob) => {
    setIsProcessingFile(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      if (voiceSettings.language === "hi" || voiceSettings.language === "en") {
        formData.append("language", voiceSettings.language);
      }

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transcription failed");
      
      const data = await response.json();
      const transcribedText = data.text?.trim() || "";
      if (!transcribedText) {
        setMicrophoneError("No speech was detected. Keep the earbuds connected and speak closer to the microphone.");
        return;
      }
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const displayMessage = {
        role: "user",
        content: `🎙️ Voice Note: "${transcribedText}"`,
        audioUrl: audioUrl
      };
      
      const bodyPayload = {
        messages: [...messages, { role: "user", content: transcribedText }]
      };
      
      const initialMessagesForUI = [...messages, displayMessage];
      runAssistantFetch(bodyPayload, initialMessagesForUI);
    } catch (err) {
      console.error("Transcription error:", err);
      alert("Failed to transcribe audio.");
    } finally {
      setIsProcessingFile(false);
    }
  };

  const submitVoiceQuery = (transcribedText) => {
    const text = transcribedText.trim();
    if (!text || isRequestActive.current) return;
    const displayMessage = { role: "user", content: `🎙️ ${text}` };
    const bodyPayload = { messages: [...messages, { role: "user", content: text }] };
    setInput("");
    runAssistantFetch(bodyPayload, [...messages, displayMessage]);
  };

  const startMediaRecorderFallback = async () => {
    try {
      setMicrophoneError("");
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("This browser does not expose microphone access.");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 }
      });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];
      speechDetectedRef.current = false;
      recordingStartedAtRef.current = Date.now();
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        setIsListening(false);
        if (silenceCheckRef.current) window.clearInterval(silenceCheckRef.current);
        silenceCheckRef.current = null;
        if (audioContextRef.current) {
          await audioContextRef.current.close().catch(() => {});
          audioContextRef.current = null;
        }
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioBlob.size > 1000) await processAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsListening(true);

      // Use the same physical stream for level detection so earbuds and USB
      // microphones work consistently. Stop after ~1.2 seconds of silence.
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        const audioContext = new AudioContextClass();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        audioContext.createMediaStreamSource(stream).connect(analyser);
        audioContextRef.current = audioContext;
        const samples = new Uint8Array(analyser.fftSize);
        let lastSpeechAt = Date.now();
        silenceCheckRef.current = window.setInterval(() => {
          analyser.getByteTimeDomainData(samples);
          let sum = 0;
          for (let i = 0; i < samples.length; i += 1) {
            const normalized = (samples[i] - 128) / 128;
            sum += normalized * normalized;
          }
          const volume = Math.sqrt(sum / samples.length);
          const now = Date.now();
          if (volume > 0.018) {
            speechDetectedRef.current = true;
            lastSpeechAt = now;
          }
          const elapsed = now - recordingStartedAtRef.current;
          if ((speechDetectedRef.current && now - lastSpeechAt > 1200) || elapsed > 20000) {
            if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
          }
        }, 100);
      }
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsListening(false);
      const message = err.name === "NotAllowedError"
        ? "Microphone permission is blocked. Allow microphone access for this site, then try again."
        : err.message || "Microphone access is unavailable.";
      setMicrophoneError(message);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
      return;
    }
    // Whisper receives the actual microphone recording and is more reliable
    // than browser-only recognition with earbuds, accents, and Hindi speech.
    setInput("");
    setMicrophoneError("");
    await startMediaRecorderFallback();
  };

  const cleanSpeechText = (value) => {
    if (typeof value !== "string") return "";
    const codeBlocks = value.match(/```[\s\S]*?```/g);
    let text = value.replace(/```[\s\S]*?```/g, codeBlocks?.length ? " Here is a code snippet; check the chat for the details. " : "");
    text = text
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/(^|\n)\s{0,3}#{1,6}\s*/g, "$1")
      .replace(/[*_~`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return text;
  };

  const getSpeechLanguage = (text) => {
    if (voiceSettings.language !== "auto") return voiceSettings.language;
    return /[\u0900-\u097F]/.test(text) ? "hi" : "en";
  };

  const selectSpeechVoice = (language, gender) => {
    const voices = window.speechSynthesis.getVoices();
    const matching = voices.filter(voice => voice.lang.toLowerCase().startsWith(language));
    const genderHints = gender === "female"
      ? ["female", "woman", "zira", "samantha", "google hindi", "heera", "kalpana"]
      : ["male", "man", "david", "alex", "ravi", "hemant", "google uk english male"];
    return matching.find(voice => genderHints.some(hint => voice.name.toLowerCase().includes(hint)))
      || matching[0]
      || voices[0];
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    speechRef.current = null;
    speechKeyRef.current = null;
    speechOffsetRef.current = 0;
    setSpeechState({ key: null, text: "", isPaused: false, progress: 0 });
  };

  const speakText = (rawText, key, offset = 0) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported by this browser.");
      return;
    }
    const text = cleanSpeechText(rawText);
    if (!text) return;
    const language = getSpeechLanguage(text);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    utterance.rate = Number(voiceSettings.rate);
    utterance.volume = Number(voiceSettings.volume);
    const voice = selectSpeechVoice(language, voiceSettings.gender);
    if (voice) utterance.voice = voice;

    speechTextRef.current = text;
    speechKeyRef.current = key;
    speechOffsetRef.current = offset;
    speechRef.current = utterance;
    setSpeechState({ key, text, isPaused: false, progress: Math.min(100, (offset / Math.max(1, text.length)) * 100) });

    utterance.onboundary = (event) => {
      if (typeof event.charIndex === "number") {
        setSpeechState(prev => ({ ...prev, progress: Math.min(100, ((offset + event.charIndex) / text.length) * 100) }));
      }
    };
    utterance.onend = () => {
      if (speechRef.current === utterance) {
        speechRef.current = null;
        speechKeyRef.current = null;
        setSpeechState({ key: null, text: "", isPaused: false, progress: 0 });
      }
    };
    utterance.onerror = () => {
      if (speechRef.current === utterance) stopSpeaking();
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = (text, key) => {
    if (speechKeyRef.current === key && window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setSpeechState(prev => ({ ...prev, isPaused: false }));
      } else {
        window.speechSynthesis.pause();
        setSpeechState(prev => ({ ...prev, isPaused: true }));
      }
      return;
    }
    speakText(text, key);
  };

  const seekSpeech = (percentage) => {
    if (!speechTextRef.current || !speechKeyRef.current) return;
    const offset = Math.floor((Number(percentage) / 100) * speechTextRef.current.length);
    speakText(speechTextRef.current, speechKeyRef.current, offset);
  };

  const saveChatTitle = (id, newTitle) => {
    setChats(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, title: newTitle } : c);
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
    setEditingChatId(null);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsProcessingFile(true);

    try {
      const processedFiles = [];
      for (const file of files) {
        if (file.type.startsWith("audio/")) {
          const formData = new FormData();
          formData.append("audio", file);
          
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Transcription failed");
          
          const data = await response.json();
          setInput(prev => (prev ? prev + " " + data.text : data.text));
        } else if (file.type === "application/pdf" || file.type.startsWith("image/")) {
          const reader = new FileReader();
          const base64 = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
          processedFiles.push({
            name: file.name,
            type: file.type === "application/pdf" ? "PDF" : "IMAGE",
            content: "Raw media buffer captured.",
            base64
          });
        } else {
          const content = await file.text();
          processedFiles.push({ name: file.name, type: "DOC", content: content.trim() });
        }
      }
      if (processedFiles.length > 0) {
        setAttachedFiles(prev => [...prev, ...processedFiles]);
      }
    } catch (err) {
      console.error("Scan Error:", err);
      alert("Failed to parse some files.");
    } finally {
      setIsProcessingFile(false);
      e.target.value = "";
    }
  };

  const runAssistantFetch = async (apiPayload, initialMessagesForUI) => {
    isRequestActive.current = true;
    setIsLoading(true);

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const lastUserContent = apiPayload.messages[apiPayload.messages.length - 1].content;
    const textToCheck = typeof lastUserContent === 'string' ? lastUserContent : (lastUserContent[0]?.text || "");
    
    if (textToCheck.startsWith("/image ")) {
      setMessages(initialMessagesForUI);
      const imagePrompt = textToCheck.replace("/image ", "").trim();
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}`;
      
      setMessages(prev => [...prev, { role: "assistant", content: `![Generated Image](${imageUrl})` }]);
      setIsLoading(false);
      isRequestActive.current = false;
      return;
    }

    setMessages([...initialMessagesForUI, { role: "assistant", content: "" }]);

    // Sanitize messages to remove UI-only fields like audioUrl
    const sanitizedMessages = apiPayload.messages.map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...apiPayload, messages: sanitizedMessages, model: selectedModel }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        let errorMessage = `Request failed (${response.status})`;
        try {
          const errorBody = await response.json();
          if (errorBody?.error) errorMessage = errorBody.error;
        } catch (e) { }
        throw new Error(errorMessage);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const { content } = JSON.parse(data);
              assistantText += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].content = assistantText;
                return updated;
              });
            } catch (e) { }
          }
        }
      }
      if (voiceMode && assistantText.trim()) {
        speakText(assistantText, initialMessagesForUI.length);
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        if (updated[updated.length - 1].role === "assistant") {
          updated[updated.length - 1].content = err.name === "AbortError" 
            ? (updated[updated.length - 1].content || "Generation stopped.")
            : `Error: ${err.message || "Could not reach intelligence core."}`;
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
      isRequestActive.current = false;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isRequestActive.current || (isLoading && !input.trim() && attachedFiles.length === 0)) return;

    const currentInput = input.trim();
    if (!currentInput && attachedFiles.length === 0) return;

    let fileHeader = attachedFiles.length > 0 
      ? `📄 [Scanned ${attachedFiles.length} files: ${attachedFiles.map(f => f.name).join(", ")}]\n` 
      : "";
      
    const displayMessage = {
      role: "user",
      content: fileHeader + currentInput
    };

    let bodyPayload;
    const hasImages = attachedFiles.some(f => f.type === "IMAGE");
    
    if (hasImages) {
      let contentArray = [];
      if (currentInput) {
        contentArray.push({ type: "text", text: currentInput });
      } else {
        contentArray.push({ type: "text", text: "Please analyze the attached image(s)." });
      }
      
      const textFilesContext = attachedFiles
          .filter(f => f.type !== "IMAGE")
          .map(f => `DOCUMENT ${f.name}:\n${f.base64 || f.content}`)
          .join("\n\n");
      
      if (textFilesContext) {
        contentArray[0].text = `[SCANNED CONTEXT]\n${textFilesContext}\n\n[USER QUERY]\n${contentArray[0].text}`;
      }

      attachedFiles.filter(f => f.type === "IMAGE").forEach(img => {
        contentArray.push({ type: "image_url", image_url: { url: img.base64 } });
      });
      
      bodyPayload = {
        messages: [...messages, { role: "user", content: contentArray }]
      };
    } else {
      let finalPrompt = currentInput;
      if (attachedFiles.length > 0) {
        const textFilesContext = attachedFiles
          .map(f => `[SCANNED DOCUMENT: ${f.name}]\n${f.base64 || f.content}`)
          .join("\n\n---\n\n");
        finalPrompt = `${textFilesContext}\n---\nUser Query: ${currentInput || "Summarize the above context."}`;
      }
      bodyPayload = {
        messages: [...messages, { role: "user", content: finalPrompt }]
      };
    }

    setInput("");
    setAttachedFiles([]);
    const initialMessagesForUI = [...messages, displayMessage];
    runAssistantFetch(bodyPayload, initialMessagesForUI);
  };

  const handleRegenerate = () => {
    if (messages.length < 2 || isRequestActive.current) return;
    const lastUserIndex = messages.map(m => m.role).lastIndexOf("user");
    if (lastUserIndex === -1) return;
    
    const newMessages = messages.slice(0, lastUserIndex + 1);
    const apiPayload = { messages: newMessages };
    runAssistantFetch(apiPayload, newMessages);
  };

  const handleStop = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setIsLoading(false);
    isRequestActive.current = false;
  };

  const handleClearChat = () => {
    // Only prompt to clear if there are messages
    if (messages.length > 0 && window.confirm("Are you sure you want to clear this conversation?")) {
      setMessages([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const [mounted, setMounted] = useState(false);
  const [sessionTimestamp, setSessionTimestamp] = useState("");

  useEffect(() => {
    setMounted(true);
    setSessionTimestamp(new Date().toLocaleTimeString());
  }, []);

  const welcomeSpokenRef = useRef(false);

  useEffect(() => {
    // layout.js intentionally locks the chat viewport; release that lock for
    // the long-form landing page so the document itself can scroll.
    document.documentElement.style.height = showLanding ? "auto" : "100%";
    document.documentElement.style.overflow = showLanding ? "visible" : "hidden";
    document.body.style.height = showLanding ? "auto" : "100vh";
    document.body.style.minHeight = showLanding ? "100vh" : "";
    document.body.style.overflow = showLanding ? "visible" : "hidden";
    if (showLanding) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (!welcomeSpokenRef.current && typeof window !== "undefined" && "speechSynthesis" in window) {
      welcomeSpokenRef.current = true;
      try {
        const welcomeText = "Welcome to Full-Stack Gen AI Assistant. How may I assist you today?";
        const utterance = new SpeechSynthesisUtterance(welcomeText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("Welcome speech error:", e);
      }
    }
    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    };
  }, [showLanding]);

  if (showLanding) return <LandingPage onLaunch={() => setShowLanding(false)} />;

  return (
    <div className="chat-console-shell flex h-screen w-full bg-white text-black font-body overflow-hidden relative">
      <div className="chat-ambient-field" aria-hidden="true">
        <div className="chat-ambient-orb chat-ambient-orb-one" />
        <div className="chat-ambient-orb chat-ambient-orb-two" />
      </div>
      {/* SKETCH OVERLAY IS NOW HANDLED IN GLOBALS.CSS */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`chat-sidebar ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-[280px] shrink-0 flex flex-col p-4 transition-all duration-500 ease-in-out`}
      >
        <div className="flex items-center gap-2 mb-6 md:hidden">
          <button onClick={() => setSidebarOpen(false)} className="p-2 ml-auto text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Mockup Header in Sidebar */}
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex items-center gap-4">
            <span className="brand-mark shrink-0" />
            <div className="flex flex-col justify-center gap-1.5 min-w-0">
              <span className="font-headline font-bold text-base leading-snug tracking-tight text-[#0B1910]">
                Full-Stack GenAI Assistant
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={createNewChat}
          className="new-chat-sheen w-full mb-6"
        >
          <Plus size={18} />
          New Discussion
        </button>

        <div className="chat-search flex items-center gap-2 mt-4 px-3 py-2 border border-[#332A18] bg-[#151209] rounded-xl text-[var(--chat-taupe)]">
          <Search size={14} />
          <input value={chatSearch} onChange={e => setChatSearch(e.target.value)} placeholder="Search conversations..." className="!border-0 !p-0 !bg-transparent text-xs w-full text-[var(--chat-cream)]" />
        </div>
        <div className="flex-1 overflow-y-auto mt-2 px-1 custom-scrollbar space-y-2">
          <div className="text-[10px] text-[var(--chat-taupe)] font-mono font-bold uppercase tracking-[0.2em] mb-4 px-2">MEMORY_BANK</div>
          {chats.filter(chat => !chatSearch.trim() || (chat.title || chat.messages?.[0]?.content || "").toLowerCase().includes(chatSearch.toLowerCase())).map((chat) => (
            <div key={chat.id} className="relative group">
              {editingChatId === chat.id ? (
                <div className="flex items-center gap-2 p-2 w-full border border-[#332A18] bg-[#151209]">
                  <span className="material-symbols-outlined scale-75 text-[var(--chat-gold)]">edit</span>
                  <input
                    autoFocus
                    value={editChatTitle}
                    onChange={(e) => setEditChatTitle(e.target.value)}
                    onBlur={() => saveChatTitle(chat.id, editChatTitle || "Session")}
                    onKeyDown={(e) => e.key === "Enter" && saveChatTitle(chat.id, editChatTitle || "Session")}
                    className="flex-1 min-w-0 bg-transparent outline-none text-[12px] font-mono text-[var(--chat-cream)] font-medium uppercase"
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => selectChat(chat)}
                    className={`flex items-center gap-3 p-3 w-full transition-all text-[12px] font-mono text-left truncate border rounded-xl ${currentChatId === chat.id
                      ? "bg-[#1D190F] border-[#9C7A1C] text-[var(--chat-gold-pale)]"
                      : "border-transparent text-[var(--chat-taupe)] hover:bg-[#151209] hover:text-[var(--chat-cream)]"
                      }`}
                  >
                    <span className="material-symbols-outlined scale-75" style={{ fontVariationSettings: currentChatId === chat.id ? "'FILL' 1" : "'FILL' 0" }}>
                      {currentChatId === chat.id ? "terminal" : "chat_bubble"}
                    </span>
                    <span className="truncate pr-16 font-medium uppercase tracking-tight">
                      {chat.title && chat.title !== "New Session" ? chat.title : (chat.messages.length > 0 ? chat.messages[0].content : "Empty_Session")}
                    </span>
                  </button>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-all gap-1 bg-[#151209] p-1 rounded-md">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingChatId(chat.id); setEditChatTitle(chat.title && chat.title !== "New Session" ? chat.title : ""); }}
                      className="p-1 text-[var(--chat-taupe)] hover:text-[var(--chat-gold)]"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={(e) => deleteChat(e, chat.id)}
                      className="p-1 text-[var(--chat-taupe)] hover:text-red-400 z-10"
                    >
                      <span className="material-symbols-outlined scale-75">close</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto relative">
          <div
            onClick={() => user ? null : setIsAuthVisible(true)}
            className="flex items-center gap-3 w-full cursor-pointer hover:bg-white/10 p-3 transition-all group rounded-xl"
          >
            <div className="w-10 h-10 bg-white/20 text-white flex items-center justify-center shrink-0 rounded-lg group-hover:scale-105 transition-transform">
              {user ? (
                <span className="font-headline font-bold text-lg">{user.name[0]}</span>
              ) : (
                <Bot size={22} className="text-emerald-400" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-headline font-bold truncate text-white uppercase leading-tight">
                {user ? user.name : "LOGIN / SIGNUP"}
              </span>
              <span className="text-[10px] text-emerald-300 font-label uppercase tracking-tighter">
                {user ? "Identity_Confirmed" : "No active session"}
              </span>
            </div>
            {user && (
              <button
                onClick={(e) => { e.stopPropagation(); setUser(null); }}
                className="ml-auto p-1.5 hover:bg-black/20 text-emerald-200 hover:text-red-400 transition-all"
                title="Logout"
              >
                <span className="material-symbols-outlined scale-75">logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isAuthVisible && (
        <Auth
          onClose={() => setIsAuthVisible(false)}
          onLogin={(userData) => setUser(userData)}
          currentUser={user}
          onHome={() => setShowLanding(true)}
        />
      )}

      {/* Main Content */}
      <div className="chat-main flex-1 flex flex-col min-w-0 h-full relative z-0">


        <div className="chat-topbar sticky top-0 z-30 flex items-center justify-between p-4 text-white md:px-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 md:hidden">
              <Menu size={26} />
            </button>
            <div className="hidden md:flex items-center pointer-events-none">
               <span className="font-headline font-bold text-lg tracking-tight text-white">AI CONSOLE</span>
            </div>
            <button
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase transition-all bg-white/10 hover:bg-white/20 text-white"
              title="Back to home"
            >
              <HomeIcon size={13} /> HOME
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 transition-colors text-white"
                title="Clear Chat"
              >
                <Trash2 size={14} />
              </button>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-bold font-mono tracking-tighter text-white"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <>
                  <Sun size={14} />
                  <span>LIGHT MODE</span>
                </>
              ) : (
                <>
                  <Moon size={14} />
                  <span>DARK MODE</span>
                </>
              )}
            </button>
            <button
              onClick={() => setVoiceMode(prev => !prev)}
              className={`chat-voice-switch flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-bold font-mono tracking-tighter ${voiceMode ? "bg-emerald-500 text-white shadow-lg" : "bg-white/10 hover:bg-white/20 text-white"}`}
              title="Automatically speak assistant replies"
            >
              <Mic size={14} />
              <span className="hidden sm:inline">VOICE MODE {voiceMode ? "ON" : "OFF"}</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsVoiceSettingsOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-bold font-mono tracking-tighter text-white"
                title="Voice settings"
              >
                <Settings size={14} />
                <span className="hidden sm:inline">VOICE</span>
              </button>
              {isVoiceSettingsOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-emerald-950/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl z-50 text-white">
                  <div className="flex items-center gap-2 mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    <SlidersHorizontal size={13} /> Speech Controls
                  </div>
                  <label className="block mb-3 text-[10px] font-mono font-bold uppercase">
                    Voice
                    <select
                      value={voiceSettings.gender}
                      onChange={e => setVoiceSettings(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full mt-1 border border-emerald-500/30 bg-black/40 p-2 text-xs font-mono rounded-lg text-white"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </label>
                  <label className="block mb-3 text-[10px] font-mono font-bold uppercase">
                    Language
                    <select
                      value={voiceSettings.language}
                      onChange={e => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full mt-1 border border-emerald-500/30 bg-black/40 p-2 text-xs font-mono rounded-lg text-white"
                    >
                      <option value="auto">Auto detect</option>
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </label>
                  <label className="block mb-3 text-[10px] font-mono font-bold uppercase">
                    Rate: {Number(voiceSettings.rate).toFixed(1)}x
                    <input
                      type="range" min="0.5" max="2" step="0.1" value={voiceSettings.rate}
                      onChange={e => setVoiceSettings(prev => ({ ...prev, rate: e.target.value }))}
                      className="w-full mt-1 !p-0 !border-0"
                    />
                  </label>
                  <label className="block text-[10px] font-mono font-bold uppercase">
                    Volume: {Math.round(Number(voiceSettings.volume) * 100)}%
                    <input
                      type="range" min="0" max="1" step="0.05" value={voiceSettings.volume}
                      onChange={e => setVoiceSettings(prev => ({ ...prev, volume: e.target.value }))}
                      className="w-full mt-1 !p-0 !border-0"
                    />
                  </label>
                  {!voicesReady && <p className="mt-3 text-[10px] text-red-400 font-mono">Loading browser voices...</p>}
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-bold font-mono tracking-tighter text-white"
            >
              <Bot size={14} />
              {selectedModel === "qwen/qwen3.8-27b" ? "Qwen 3.8 Multimodal" : selectedModel}
              <ChevronDown size={14} />
            </button>
            
            {isModelDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-emerald-950/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
                <button 
                  onClick={() => { setSelectedModel("qwen/qwen3.8-27b"); setIsModelDropdownOpen(false); }}
                  className={`text-left px-4 py-2.5 font-mono text-[10px] uppercase font-bold hover:bg-white/10 transition-colors ${selectedModel === "qwen/qwen3.8-27b" ? "text-emerald-400 font-black bg-white/10" : "text-white"}`}
                >
                  Qwen 3.8 Multimodal
                </button>
                <button 
                  onClick={() => { setSelectedModel("openai/gpt-oss-120b"); setIsModelDropdownOpen(false); }}
                  className={`text-left px-4 py-2.5 font-mono text-[10px] uppercase font-bold hover:bg-white/10 transition-colors ${selectedModel === "openai/gpt-oss-120b" ? "text-emerald-400 font-black bg-white/10" : "text-white"}`}
                >
                  GPT OSS 120B
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="chat-scroll-area flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="min-h-full flex flex-col items-center pt-8 pb-32 px-4 md:px-8">
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center animate-zoom-breath bg-white/10 backdrop-blur-xl rounded-full p-2 border border-emerald-400/40 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                <img src="/robot-icon.png" alt="Robot AI" className="w-full h-full object-contain" style={{ filter: 'drop-shadow(0 0 10px rgba(52,211,153,0.8))' }} />
              </div>
              <h1 className="text-3xl md:text-5xl font-headline font-extrabold mb-3 tracking-tight text-center text-emerald-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Full-Stack GenAI Assistant
              </h1>
              {mounted && (
                <div className="flex flex-col items-center w-full max-w-2xl">
                  {/* Project Analysis Toggle Button */}
                  <div className="mb-4 relative flex items-center justify-center">
                    {!showAbout && (
                      <div className="absolute -left-12 text-2xl animate-tap select-none">
                        👉
                      </div>
                    )}
                    <div className="animate-float-slow">
                      <button 
                        onClick={() => setShowAbout(!showAbout)}
                        className="px-6 py-2.5 border border-emerald-400/40 bg-white/10 backdrop-blur-md text-emerald-200 font-headline font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-white/20 transition-all flex items-center gap-2 rounded-full"
                      >
                        {showAbout ? <X size={14} /> : <Plus size={14} />}
                        PROJECT CORE
                      </button>
                    </div>
                  </div>

                  {/* Conditional About Me Section */}
                  {showAbout && (
                    <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
                      <div className="p-6 border border-[#332A18] bg-[#151209] rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] relative text-[var(--chat-cream)]">
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#9C7A1C] to-[#C9A227] text-[#050403] px-3 py-0.5 font-headline font-bold text-[10px] uppercase tracking-widest rounded-md shadow-md">
                          SYSTEM ARCHITECTURE & CORE
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 items-start">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <div>
                              <span className="text-[9px] font-mono text-[var(--chat-taupe)] font-bold uppercase block mb-1 tracking-wider">PROJECT_NAME</span>
                              <span className="px-3 py-1.5 border border-[#332A18] font-body font-bold text-sm text-[var(--chat-gold-pale)] bg-[#1D190F] inline-block rounded-lg shadow-sm">
                                Full-Stack GenAI Assistant
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-[var(--chat-taupe)] font-bold uppercase block mb-1 tracking-wider">DEVELOPER</span>
                                <span className="px-2.5 py-1 border border-[#332A18] font-body font-bold text-[11px] text-[var(--chat-cream)] bg-[#1D190F] inline-block rounded-lg">
                                  Chiranjeeb Dash
                                </span>
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-[var(--chat-gold)] font-bold uppercase block mb-1 tracking-wider">GITHUB</span>
                                <a 
                                  href="https://github.com/Chiranjeeb-Dash-Git" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 border border-[#9C7A1C] font-body font-bold text-[11px] text-[#050403] bg-gradient-to-r from-[#E8CD7A] to-[#C9A227] hover:opacity-90 transition-all inline-block rounded-lg shadow-sm"
                                >
                                  Profile ↗
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Column */}
                          <div className="space-y-3">
                            <span className="text-[9px] font-mono text-[var(--chat-taupe)] font-bold uppercase block tracking-wider">CORE_STACK</span>
                            <div className="flex flex-wrap gap-2">
                               {[
                                 "Next.js 14", "Tailwind CSS", "Groq AI", "Llama 3.3", "Express.js", "Tavily", 
                                 "PDF Parse", "Lucide Icons", "React Markdown", "Highlight.js"
                               ].map(t => (
                                 <span key={t} className="px-2.5 py-1 border border-[#332A18] font-body font-bold text-[10px] items-center justify-center flex bg-[#1D190F] text-[var(--chat-taupe)] hover:text-[var(--chat-cream)] hover:border-[#9C7A1C] transition-colors cursor-default rounded-md">
                                   {t}
                                 </span>
                               ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="chat-inner flex flex-col gap-6 mb-40 px-4 md:px-0 max-w-4xl mx-auto w-full">
              {messages.map((message, index) => (
                <div key={index} className={`chat-message group ${message.role === "user" ? "message-container-user" : "message-container-assistant"}`}>
                  <div className={message.role === "user" ? "message-user flex-col !items-end" : "message-assistant flex-col !items-start"}>
                    <div className="font-headline text-lg leading-relaxed w-full">
                      <span className="font-bold mr-2 text-sm text-black/40">
                        {message.role === "user"
                          ? (user ? `${user.name}: ` : "User: ")
                          : "AI Intelligence: "}
                      </span>
                      {message.role === "user" ? (
                        editingMessageIndex === index ? (
                          <div className="mt-2 w-full animate-in fade-in duration-300">
                            <textarea
                              className="w-full bg-white text-black border-2 border-black p-3 font-mono text-sm leading-relaxed"
                              rows={4}
                              value={editingMessageContent}
                              onChange={(e) => setEditingMessageContent(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <button 
                                onClick={() => setEditingMessageIndex(null)}
                                className="px-3 py-1 border-2 border-transparent text-xs font-bold uppercase hover:bg-black/5 text-black"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => submitEditedMessage(index)}
                                className="px-3 py-1 border-2 border-black text-xs font-bold uppercase bg-black text-white hover:bg-gray-800"
                              >
                                Save & Submit
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 w-full">
                            <div className="inline break-words whitespace-pre-wrap">{message.content}</div>
                            {message.audioUrl && (
                              <audio src={message.audioUrl} controls className="w-full mt-2 h-10 filter invert grayscale opacity-80" />
                            )}
                          </div>
                        )
                      ) : (
                        message.content || (
                          <div className="flex items-center gap-1.5 h-6 px-1">
                            <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-[bounce_1s_infinite_0s]"></span>
                          </div>
                        )
                      )}
                    </div>
                    {/* Metadata / Actions */}
                    {message.role === "user" && editingMessageIndex !== index && (
                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end w-full">
                        <button 
                          onClick={() => { setEditingMessageIndex(index); setEditingMessageContent(typeof message.content === 'string' ? message.content : "[Media Attachment]"); }}
                          className="p-1.5 border border-black/20 hover:bg-black/5 text-black rounded transition-all flex items-center gap-1"
                          title="Edit Message"
                        >
                          <Edit2 size={12} />
                          <span className="text-[10px] font-bold uppercase">Edit</span>
                        </button>
                      </div>
                    )}
                    {message.role === "assistant" && message.content && (
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => toggleSpeech(message.content, index)}
                          className="p-1.5 border border-black/20 hover:bg-black/5 text-black rounded transition-all"
                          title="Read Aloud"
                        >
                          {speechState.key === index && !speechState.isPaused ? <Pause size={12} /> : <Volume2 size={12} />}
                        </button>
                        {index === messages.length - 1 && !isLoading && (
                          <button 
                            onClick={handleRegenerate}
                            className="p-1.5 border border-black/20 hover:bg-black/5 text-black rounded transition-all flex items-center gap-1"
                            title="Regenerate Output"
                          >
                            <RotateCcw size={12} />
                            <span className="text-[10px] font-bold uppercase">Regenerate</span>
                          </button>
                        )}
                      </div>
                    )}
                    {message.role === "assistant" && speechState.key === index && (
                      <div className="mt-2 flex items-center gap-2 w-full max-w-sm border-2 border-black p-2 bg-white text-black">
                        <button
                          onClick={() => toggleSpeech(message.content, index)}
                          className="p-1 border border-black hover:bg-black hover:text-white"
                          title={speechState.isPaused ? "Play" : "Pause"}
                        >
                          {speechState.isPaused ? <Play size={12} /> : <Pause size={12} />}
                        </button>
                        <input
                          type="range" min="0" max="100" value={speechState.progress}
                          onChange={e => seekSpeech(e.target.value)}
                          className="flex-1 !p-0 !border-0"
                          aria-label="Speech progress"
                        />
                        <span className="text-[9px] font-mono w-8 text-right">{Math.round(speechState.progress)}%</span>
                        <Volume2 size={12} />
                        <input
                          type="range" min="0" max="1" step="0.05" value={voiceSettings.volume}
                          onChange={e => setVoiceSettings(prev => ({ ...prev, volume: e.target.value }))}
                          className="w-14 !p-0 !border-0"
                          aria-label="Speech volume"
                        />
                        <button onClick={stopSpeaking} className="p-1 border border-black hover:bg-red-600 hover:text-white" title="Stop">
                          <Square size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Terminal Input — Rectangular Cyber Ivory-Green Design */}
        <div className="chat-composer-wrap absolute bottom-0 left-0 w-full pt-12 pb-6 px-4 md:px-8 z-20">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            {isListening && (
              <div className="mb-3 flex items-center gap-3 border-2 border-red-500 bg-red-950/80 px-4 py-3 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse rounded-lg">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Listening... speak now</span>
                <span className="ml-auto flex items-end gap-0.5 h-4" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map(bar => <span key={bar} className="w-1 bg-red-500 animate-bounce" style={{ height: `${bar * 3}px`, animationDelay: `${bar * 80}ms` }} />)}
                </span>
              </div>
            )}
            {microphoneError && !isListening && (
              <div className="mb-3 flex items-center justify-between gap-3 border-2 border-red-600 bg-red-950/90 px-4 py-3 text-red-300 font-mono text-[10px] font-bold uppercase rounded-lg">
                <span>{microphoneError}</span>
                <button type="button" onClick={() => setMicrophoneError("")} className="border border-red-500 px-2 py-1 hover:bg-red-600 hover:text-white">Dismiss</button>
              </div>
            )}
            {(attachedFiles.length > 0 || isProcessingFile) && (
              <div className="mb-3 flex flex-wrap gap-2 animate-in slide-in-from-bottom-2 duration-300">
                {isProcessingFile && (
                  <div className="flex items-center gap-2 p-2 bg-[#0A140E] border-2 border-[#D4AF37] text-[#E2ECE5] shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                    <Loader2 className="animate-spin text-[#D4AF37]" size={16} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">Analyzing_Buffer...</span>
                  </div>
                )}
                {attachedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-[#0A140E] border-2 border-[#D4AF37] text-[#E2ECE5] max-w-[200px] shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                    {file.type === "IMAGE" ? <ImageIcon size={14} className="shrink-0 text-[#D4AF37]" /> : <FileText size={14} className="shrink-0 text-[#D4AF37]" />}
                    <span className="text-[10px] font-mono font-bold uppercase truncate">{file.name}</span>
                    <button type="button" onClick={() => removeAttachedFile(i)} className="p-1 hover:bg-white/10 rounded text-[#D4AF37]">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 md:gap-4">
              {/* Square Attach Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-11 h-11 shrink-0 flex items-center justify-center bg-white text-black border-2 border-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
                title="Attach Files"
              >
                <Paperclip size={20} className="stroke-[2.2]" />
              </button>
              <input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,image/*,.txt,.md,.js,.json,audio/*" />

              {/* Main Rectangular White/Ivory Input Box with Golden/Emerald Glow Border */}
              <div
                className="flex-grow flex items-center bg-white border-2 border-[#000000] focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/50 transition-all cursor-text min-h-[44px] px-4 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
                onClick={() => textareaRef.current?.focus()}
              >
                <div className="relative flex-grow min-h-[1.5rem] font-mono text-xs md:text-sm flex items-center">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={input ? "" : "How may I assist you?"}
                    className="absolute inset-0 w-full h-full opacity-0 z-10 font-mono text-xs md:text-sm cursor-text resize-none bg-transparent border-0 ring-0 focus:ring-0 outline-none p-0 text-black"
                    rows={1}
                  />

                  <div className="w-full break-all whitespace-pre-wrap text-black pointer-events-none flex flex-wrap items-center font-mono font-medium">
                    {!input && (
                      <span className="text-gray-400 font-mono">How may I assist you?</span>
                    )}
                    <span className="text-black">{input}</span>
                    <span className="w-2.5 h-4 bg-black cursor-blink shrink-0 ml-1 inline-block" />
                  </div>
                </div>
              </div>

              {/* Square Mic Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`w-11 h-11 shrink-0 flex items-center justify-center transition-all shadow-[0_4px_14px_rgba(0,0,0,0.5)] border-2 ${isListening ? 'border-red-500 bg-red-500 text-white animate-pulse' : 'border-black bg-white text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'}`}
                title={isListening ? "Stop listening" : "Start voice assistant"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} className="stroke-[2.2]" />}
              </button>

              {/* EXECUTE / STOP Button */}
              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="h-11 px-6 flex items-center justify-center gap-2 border-2 border-red-500 bg-red-950 text-red-400 font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_16px_rgba(239,68,68,0.4)] hover:bg-red-900 transition-all shrink-0"
                >
                  <StopCircle size={16} />
                  STOP
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={(!input.trim() && attachedFiles.length === 0)}
                  className="h-11 px-6 flex items-center justify-center gap-2 border-2 border-[#1F4D32] bg-[#0A1810] hover:bg-[#142A1D] hover:border-[#D4AF37] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_16px_rgba(15,42,29,0.7)] transition-all shrink-0 disabled:opacity-50"
                >
                  <Send size={15} className="rotate-[-20deg]" />
                  EXECUTE
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
