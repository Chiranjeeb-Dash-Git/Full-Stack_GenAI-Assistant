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
  Home as HomeIcon,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Sparkles
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
  const [isAuthVisible, setIsAuthVisible] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedModel, setSelectedModel] = useState("LLaMA 3.3 · 70B");
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [chatSearch, setChatSearch] = useState("");
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [consoleMode, setConsoleMode] = useState("precise");
  const [activeSideTab, setActiveSideTab] = useState("chats");
  const [showScrollFab, setShowScrollFab] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [embers, setEmbers] = useState([]);
  const [selectedLang, setSelectedLang] = useState("EN");
  const [playingMsgIndex, setPlayingMsgIndex] = useState(null);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatScrollRef = useRef(null);
  const isRequestActive = useRef(false);
  const welcomeSpokenRef = useRef(false);

  // Female voice welcome speaker (STRICTLY FEMALE VOICE ONLY, ONCE ONLY)
  const speakWelcomeMessage = () => {
    if (welcomeSpokenRef.current) return;
    welcomeSpokenRef.current = true;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const welcomeText = "Welcome, how may I help you";
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      utterance.rate = 0.95;
      utterance.pitch = 1.2; // High pitch for female tone
      utterance.volume = 1.0;

      const findFemaleVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;
        
        const femaleKeywords = ["female", "samantha", "victoria", "karen", "zira", "google us english", "jenny", "aria"];
        const maleKeywords = ["male", "guy", "david", "george", "mark", "alex", "daniel"];

        const femaleMatch = voices.find(v => 
          v.lang.startsWith("en") && femaleKeywords.some(kw => v.name.toLowerCase().includes(kw))
        );
        if (femaleMatch) return femaleMatch;

        const nonMaleMatch = voices.find(v => 
          v.lang.startsWith("en") && !maleKeywords.some(kw => v.name.toLowerCase().includes(kw))
        );
        return nonMaleMatch || voices[0];
      };

      const speakWithFemaleVoice = () => {
        const v = findFemaleVoice();
        if (v) utterance.voice = v;
        window.speechSynthesis.speak(utterance);
      };

      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        speakWithFemaleVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          speakWithFemaleVoice();
          window.speechSynthesis.onvoiceschanged = null;
        };
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error("Welcome speech error:", e);
    }
  };

  // Manage body scroll for landing page vs chat console
  useEffect(() => {
    document.documentElement.style.height = showLanding ? "auto" : "100%";
    document.documentElement.style.overflow = showLanding ? "visible" : "hidden";
    document.body.style.height = showLanding ? "auto" : "100vh";
    document.body.style.minHeight = showLanding ? "100vh" : "";
    document.body.style.overflow = showLanding ? "visible" : "hidden";

    if (!showLanding && !isAuthVisible) {
      speakWelcomeMessage();
    }

    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    };
  }, [showLanding, isAuthVisible]);

  // Particles generator
  useEffect(() => {
    const list = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: Math.random() * 100,
      drift: Math.random() * 80 - 40,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 4
    }));
    setEmbers(list);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Voice player for messages
  const togglePlayMessageVoice = (text, idx) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (playingMsgIndex === idx) {
      window.speechSynthesis.cancel();
      setPlayingMsgIndex(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setPlayingMsgIndex(null);
      utterance.onerror = () => setPlayingMsgIndex(null);
      setPlayingMsgIndex(idx);
      window.speechSynthesis.speak(utterance);
    }
  };

  const removeAttachedFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const createNewChat = () => {
    const newChatObj = { id: Date.now().toString(), title: "New Session", messages: [] };
    setChats(prev => [newChatObj, ...prev]);
    setCurrentChatId(newChatObj.id);
    setMessages([]);
  };

  const selectChat = (chat) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages || []);
  };

  const deleteChat = (e, id) => {
    e.stopPropagation();
    setChats(prev => prev.filter(c => c.id !== id));
    if (currentChatId === id) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    if (currentChatId) {
      setChats(prev => prev.map(c => c.id === currentChatId ? { ...c, messages: [] } : c));
    }
  };

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!chatScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollRef.current;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 60;
    setShowScrollFab(!nearBottom && messages.length > 0);
  };

  const runAssistantFetch = async (apiPayload, initialMessagesForUI) => {
    setIsLoading(true);
    isRequestActive.current = true;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiPayload.messages.map(m => ({ role: m.role, content: m.content })),
          model: selectedModel,
          mode: consoleMode
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantReply = "";

      setMessages([...initialMessagesForUI, { role: "assistant", content: "" }]);

      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const jsonStr = trimmed.replace(/^data:\s*/, "");
            if (jsonStr === "[DONE]") break;
            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.content) {
                assistantReply += parsed.content;
                setMessages([...initialMessagesForUI, { role: "assistant", content: assistantReply }]);
              }
            } catch (e) {
              // Ignore parse errors on partial json tokens
            }
          }
        }
      }

      if (!assistantReply) {
        assistantReply = "Hello! How can I assist you today?";
        setMessages([...initialMessagesForUI, { role: "assistant", content: assistantReply }]);
      }

      if (voiceMode && assistantReply) {
        togglePlayMessageVoice(assistantReply, initialMessagesForUI.length);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([...initialMessagesForUI, { role: "assistant", content: `I'm here to help! ${err.message ? "(" + err.message + ")" : ""}` }]);
    } finally {
      setIsLoading(false);
      isRequestActive.current = false;
      scrollToBottom();
    }
  };

  const handleSendMessage = (customText = "") => {
    const textToSend = typeof customText === "string" && customText ? customText : input;
    if (!textToSend.trim() && attachedFiles.length === 0) return;
    if (isRequestActive.current) return;

    const userMsg = { role: "user", content: textToSend.trim(), files: attachedFiles };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setAttachedFiles([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const apiPayload = { messages: newMsgs };
    runAssistantFetch(apiPayload, newMsgs);
  };

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLang === "HI" ? "hi-IN" : "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev ? prev + " " + transcript : transcript));
    };
    recognition.start();
  };

  if (showLanding) return <LandingPage onLaunch={() => setShowLanding(false)} />;

  return (
    <div className={`chat-console-shell flex h-screen w-full font-body overflow-hidden relative ${isDarkMode ? "dark" : "light"}`}>
      
      {/* Background Embers & Vignette */}
      <div className="embers" id="embers">
        {embers.map(e => (
          <div
            key={e.id}
            className="ember"
            style={{
              width: `${e.size}px`,
              height: `${e.size}px`,
              left: `${e.left}%`,
              "--drift": `${e.drift}px`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`
            }}
          />
        ))}
      </div>
      <div className="vignette" />

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`chat-sidebar ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-[288px] shrink-0 flex flex-col p-5 transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-4 md:mb-2">
          <div className="flex items-center gap-2 font-headline text-[16px] font-medium tracking-tight">
            <span className="brand-mark" /> Full-Stack GenAI Assistant
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="side-tabs my-3">
          <button className={activeSideTab === "chats" ? "active" : ""} onClick={() => setActiveSideTab("chats")}>💬 Chats</button>
          <button className={activeSideTab === "explore" ? "active" : ""} onClick={() => setActiveSideTab("explore")}>🧭 Explore</button>
          <button className={activeSideTab === "library" ? "active" : ""} onClick={() => setActiveSideTab("library")}>📚 Library</button>
        </div>

        <button onClick={createNewChat} className="new-chat-sheen w-full mb-3">
          ＋ New chat
        </button>

        <div className="chat-search-input flex items-center gap-2 px-3 py-2">
          <Search size={14} className="opacity-60" />
          <input
            value={chatSearch}
            onChange={e => setChatSearch(e.target.value)}
            placeholder="Search conversations"
            className="w-full outline-none bg-transparent text-xs"
          />
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto mt-3 custom-scrollbar space-y-1 pr-1">
          <div className="text-[10.5px] uppercase tracking-wider font-mono opacity-50 px-2 my-2">Today</div>
          {chats.length === 0 ? (
            <div className="text-xs opacity-40 px-2 py-1 italic">No saved chats yet</div>
          ) : (
            chats.filter(chat => !chatSearch.trim() || (chat.title || chat.messages?.[0]?.content || "").toLowerCase().includes(chatSearch.toLowerCase())).map((chat) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] cursor-pointer transition-all ${
                  currentChatId === chat.id
                    ? "bg-gradient-to-r from-[var(--panel-3)] to-[var(--panel-2)] text-[var(--gold-text)] font-semibold border border-[var(--line)]"
                    : "hover:bg-[var(--panel-2)] opacity-80 hover:opacity-100"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${currentChatId === chat.id ? "bg-[var(--gold)] shadow-[0_0_6px_rgba(201,162,39,0.8)]" : "bg-[var(--line)]"}`} />
                <span className="truncate flex-1">
                  {chat.title && chat.title !== "New Session" ? chat.title : (chat.messages.length > 0 ? chat.messages[0].content : "Conversation")}
                </span>
                <button
                  onClick={(e) => deleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Promo Upgrade Card */}
        <div className="promo-card">
          <div className="text-lg mb-1">👑</div>
          <h4 className="font-headline text-[14px] font-medium text-[var(--gold-text)]">Upgrade to Pro</h4>
          <p className="text-[11.5px] opacity-75 mb-3 leading-snug">Faster responses, longer memory, and priority voice generation.</p>
          <button className="w-full py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] text-[var(--void)] hover:translate-y-[-1px] transition-transform">
            Upgrade workspace
          </button>
        </div>

        {/* Sidebar Footer Profile */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--line)]">
          <div
            onClick={() => user ? null : setIsAuthVisible(true)}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--gold-deep)] to-[var(--gold-light)] text-[var(--void)] font-bold text-xs flex items-center justify-center relative">
              {user ? user.name[0].toUpperCase() : "CD"}
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-[var(--paper)]" />
            </div>
            <div>
              <div className="text-[13px] font-semibold leading-tight">{user ? user.name : "Chiranjeeb"}</div>
              <div className="text-[11px] opacity-60">Pro workspace</div>
            </div>
          </div>
          <button onClick={() => setIsVoiceSettingsOpen(prev => !prev)} className="p-2 rounded-lg hover:bg-[var(--panel)] text-[var(--taupe)]" title="Settings">
            ⚙️
          </button>
        </div>
      </aside>

      {/* Auth Modal */}
      {isAuthVisible && (
        <Auth
          onClose={() => {
            setIsAuthVisible(false);
            speakWelcomeMessage();
          }}
          onLogin={(userData) => {
            setUser(userData);
            setIsAuthVisible(false);
            speakWelcomeMessage();
          }}
          currentUser={user}
          onHome={() => setShowLanding(true)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="main flex-1 flex flex-col min-w-0 h-full relative z-1">

        {/* Topbar */}
        <div className="chat-topbar flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[var(--taupe)]">
              <Menu size={22} />
            </button>
            
            {/* Mode Switcher Toggle */}
            <div className={`mode-toggle ${consoleMode === "fast" ? "fast" : ""}`}>
              <div className="indicator" />
              <button className={consoleMode === "precise" ? "active" : ""} onClick={() => setConsoleMode("precise")}>Precise</button>
              <button className={consoleMode === "fast" ? "active" : ""} onClick={() => setConsoleMode("fast")}>Fast</button>
            </div>
          </div>

          {/* Model Badge */}
          <div className="model-badge hidden sm:flex">
            <span className="pulse" />
            <b>{selectedModel}</b>&nbsp;via Groq LPU
          </div>

          <div className="flex items-center gap-3">
            {/* Voice Mode Toggle Switch */}
            <div
              className={`voice-switch-btn ${voiceMode ? "on" : ""}`}
              onClick={() => setVoiceMode(prev => !prev)}
            >
              <div className="switch-track"><div className="knob" /></div>
              <span className="hidden sm:inline">Voice mode</span>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--gold)] transition-colors"
            >
              <HomeIcon size={13} /> Home
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--taupe)] hover:text-[var(--cream)] transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>

        {/* Chat Scroll Area */}
        <div
          ref={chatScrollRef}
          onScroll={handleScroll}
          className="chat-scroll flex-1 overflow-y-auto px-4 md:px-0 relative"
        >
          {messages.length === 0 ? (
            /* Empty State Hero - Robot AI Icon with animations */
            <div className="hero-empty show min-h-[75vh] flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-10">
              
              {/* Animated Robot AI Icon */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-5 flex items-center justify-center rounded-full p-2 bg-radial from-[var(--gold)]/20 to-transparent">
                <img src="/robot-icon.png" alt="Robot AI" className="w-full h-full object-contain animate-float-slow filter drop-shadow-[0_0_20px_rgba(201,162,39,0.5)]" />
              </div>

              <div className="hero-orb"><span>✦</span></div>
              <h2 className="serif text-2xl md:text-3xl font-medium mb-2 text-[var(--cream)]">How can I help you today?</h2>
              <p className="text-[var(--taupe)] text-sm mb-8">Ask anything, upload a document, or start talking.</p>

              {/* 4 Clickable Suggestion Chips */}
              <div className="suggest-grid">
                <button
                  className="suggest-chip"
                  onClick={() => handleSendMessage("Summarize a document for me.")}
                >
                  <b>Summarize a document</b>Paste text or drop a PDF to condense
                </button>
                <button
                  className="suggest-chip"
                  onClick={() => handleSendMessage("Explain a complex AI concept simply.")}
                >
                  <b>Explain a concept</b>Break down something complex, simply
                </button>
                <button
                  className="suggest-chip"
                  onClick={() => handleSendMessage("Draft a professional follow-up email.")}
                >
                  <b>Draft an email</b>Professional, casual, or somewhere between
                </button>
                <button
                  className="suggest-chip"
                  onClick={() => handleSendMessage("Generate an image of a futuristic lab.")}
                >
                  <b>Generate an image</b>Describe it and watch it render
                </button>
              </div>
            </div>
          ) : (
            /* Messages List with Speech Bubbles */
            <div className="max-w-[760px] mx-auto py-8 flex flex-col gap-6">
              {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.role === "user" ? "user" : "assistant"}`}>
                  
                  {/* User or Assistant Avatar */}
                  {msg.role === "assistant" ? (
                    <div className="avatar-orb"><span>✦</span></div>
                  ) : (
                    <div className="avatar-user">{user ? user.name[0].toUpperCase() : "CD"}</div>
                  )}

                  <div className="msg-col">
                    <div className="msg-label">
                      <b>{msg.role === "user" ? (user ? user.name : "You") : "Assistant"}</b>
                      {msg.role === "assistant" && <span className="opacity-60"> · LLaMA 3.3</span>}
                    </div>

                    <div className="bubble-wrap">
                      <div className={msg.role === "user" ? "msg-bubble-user" : "msg-bubble-assistant"}>
                        <MarkdownRenderer content={msg.content} />
                      </div>
                    </div>

                    {/* Audio Player Control for Assistant Messages */}
                    {msg.role === "assistant" && msg.content && (
                      <div className="voice-ctrl">
                        <button
                          className="play-btn"
                          onClick={() => togglePlayMessageVoice(msg.content, index)}
                        >
                          {playingMsgIndex === index ? "❚❚" : "▶"}
                          <span className={`ripple ${playingMsgIndex === index ? "go" : ""}`} />
                        </button>
                        <div className="seek">
                          <div className={`fill ${playingMsgIndex === index ? "playing" : ""}`} style={{ width: playingMsgIndex === index ? "65%" : "0%" }} />
                        </div>
                        <span className="time">{playingMsgIndex === index ? "Playing" : "Voice playback"}</span>
                        <span className="lang-chip">EN</span>
                      </div>
                    )}

                    {/* Message Actions Row */}
                    <div className="flex gap-1.5 mt-2 opacity-70 hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigator.clipboard.writeText(msg.content)}
                        className="p-1.5 rounded hover:bg-[var(--panel-2)] text-[var(--taupe)] text-xs"
                        title="Copy text"
                      >
                        <Copy size={13} />
                      </button>
                      {msg.role === "assistant" && (
                        <>
                          <button
                            onClick={() => handleSendMessage(messages[index - 1]?.content || "Please elaborate.")}
                            className="p-1.5 rounded hover:bg-[var(--panel-2)] text-[var(--taupe)] text-xs"
                            title="Regenerate"
                          >
                            <RotateCcw size={13} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-[var(--panel-2)] text-[var(--taupe)] text-xs" title="Good response">
                            <ThumbsUp size={13} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-[var(--panel-2)] text-[var(--taupe)] text-xs" title="Poor response">
                            <ThumbsDown size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming Loading Indicator */}
              {isLoading && (
                <div className="msg assistant">
                  <div className="avatar-orb"><span>✦</span></div>
                  <div className="msg-col">
                    <div className="msg-bubble-assistant w-36">
                      <div className="shimmer-bar" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Floating Scroll FAB */}
          {showScrollFab && (
            <button className="scroll-fab" onClick={scrollToBottom}>
              ↓
            </button>
          )}
        </div>

        {/* ================= INPUT COMPOSER ================= */}
        <div className="p-4 md:pb-6">
          <div className="max-w-[760px] mx-auto">
            
            {/* Attached Files Pill Bar */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 px-2">
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-[var(--panel-2)] border border-[var(--line)] px-3 py-1 rounded-full text-xs">
                    <Paperclip size={12} />
                    <span className="truncate max-w-[140px]">{file.name}</span>
                    <button onClick={() => removeAttachedFile(idx)} className="hover:text-red-400">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={`input-shell-wrap ${inputFocused ? "focused" : ""}`}>
              <div className="input-shell">
                
                {/* File Attachment Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setAttachedFiles(prev => [...prev, e.target.files[0]]);
                    }
                  }}
                  className="hidden"
                />
                <button
                  className="attach-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                >
                  <Paperclip size={16} />
                </button>

                {/* Textarea Composer */}
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Message the console..."
                />

                {/* Microphone Voice Input Button */}
                <button
                  className={`mic-btn ${isListening ? "recording" : ""}`}
                  onClick={handleMicClick}
                  title="Voice input"
                >
                  <span className="sonar" />
                  <Mic size={16} />
                </button>

                {/* Send Button */}
                <button
                  className="send-btn"
                  onClick={() => handleSendMessage()}
                  title="Send message"
                >
                  ➤
                </button>
              </div>
            </div>

            {/* Input Hint Footer */}
            <div className="flex justify-between items-center mt-2 px-2 text-[11.5px] opacity-75 text-[var(--taupe)]">
              <span>Shift + Enter for a new line</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setSelectedLang("EN")}
                  className={`px-2.5 py-0.5 rounded-full border text-[10.5px] ${selectedLang === "EN" ? "bg-[var(--gold)] text-[var(--void)] border-[var(--gold)] font-bold" : "border-[var(--line)] bg-[var(--panel)]"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSelectedLang("HI")}
                  className={`px-2.5 py-0.5 rounded-full border text-[10.5px] ${selectedLang === "HI" ? "bg-[var(--gold)] text-[var(--void)] border-[var(--gold)] font-bold" : "border-[var(--line)] bg-[var(--panel)]"}`}
                >
                  हिं
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
