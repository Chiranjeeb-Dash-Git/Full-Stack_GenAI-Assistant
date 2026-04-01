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
  Sun
} from "lucide-react";

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
  const [selectedModel, setSelectedModel] = useState("llama-3.3-70b-versatile");
  const [isListening, setIsListening] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editChatTitle, setEditChatTitle] = useState("");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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

  const getStorageKey = () => `chat_history_${user?.email || "guest"}`;

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

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event?.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech Recognition is not supported in this browser.");
      }
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
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
        if (file.type === "application/pdf" || file.type.startsWith("image/")) {
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
        }
        else {
          const content = await file.text();
          processedFiles.push({ name: file.name, type: "DOC", content: content.trim() });
        }
      }
      setAttachedFiles(prev => [...prev, ...processedFiles]);
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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...apiPayload, model: selectedModel }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Connection failed");

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
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        if (updated[updated.length - 1].role === "assistant") {
          updated[updated.length - 1].content = err.name === "AbortError" 
            ? (updated[updated.length - 1].content || "Generation stopped.")
            : "Error: Could not reach intelligence core.";
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

  return (
    <div className="flex h-screen w-full bg-white text-black font-body overflow-hidden relative">
      {/* SKETCH OVERLAY IS NOW HANDLED IN GLOBALS.CSS */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-white border-r-2 border-black shrink-0 flex flex-col p-4 transition-all duration-500 ease-in-out`}
      >
        <div className="flex items-center gap-2 mb-6 md:hidden">
          <button onClick={() => setSidebarOpen(false)} className="p-2 ml-auto text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Mockup Header in Sidebar */}
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex items-center gap-4">
            <img src="/robot-icon.png" alt="Logo" className={`w-[60px] h-[60px] shrink-0 ${isDarkMode ? "invert" : ""}`} />
            <div className="flex flex-col justify-center gap-1.5 min-w-0">
              <span className="font-headline font-bold text-lg leading-none text-black tracking-tight">Full-Stack GenAI Assistant</span>
            </div>
          </div>
        </div>

        <button
          onClick={createNewChat}
          className="premium-button flex items-center justify-center gap-3 w-full mb-6 font-label uppercase"
        >
          <Plus size={18} />
          New Discussion
        </button>

        <div className="flex-1 overflow-y-auto mt-2 px-1 custom-scrollbar space-y-2">
          <div className="text-[10px] text-black font-mono font-bold uppercase tracking-[0.2em] mb-4 px-2">MEMORY_BANK</div>
          {chats.map((chat) => (
            <div key={chat.id} className="relative group">
              {editingChatId === chat.id ? (
                <div className="flex items-center gap-2 p-2 w-full border border-black bg-white">
                  <span className="material-symbols-outlined scale-75">edit</span>
                  <input
                    autoFocus
                    value={editChatTitle}
                    onChange={(e) => setEditChatTitle(e.target.value)}
                    onBlur={() => saveChatTitle(chat.id, editChatTitle || "Session")}
                    onKeyDown={(e) => e.key === "Enter" && saveChatTitle(chat.id, editChatTitle || "Session")}
                    className="flex-1 min-w-0 bg-transparent outline-none text-[12px] font-mono text-black font-medium uppercase"
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => selectChat(chat)}
                    className={`flex items-center gap-3 p-3 w-full transition-all text-[12px] font-mono text-left truncate border ${currentChatId === chat.id
                      ? "bg-black/5 border-black text-black"
                      : "border-transparent text-black hover:bg-black/5"
                      }`}
                  >
                    <span className="material-symbols-outlined scale-75" style={{ fontVariationSettings: currentChatId === chat.id ? "'FILL' 1" : "'FILL' 0" }}>
                      {currentChatId === chat.id ? "terminal" : "chat_bubble"}
                    </span>
                    <span className="truncate pr-16 font-medium uppercase tracking-tight">
                      {chat.title && chat.title !== "New Session" ? chat.title : (chat.messages.length > 0 ? chat.messages[0].content : "Empty_Session")}
                    </span>
                  </button>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-all gap-1 bg-white">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingChatId(chat.id); setEditChatTitle(chat.title && chat.title !== "New Session" ? chat.title : ""); }}
                      className="p-1 text-black/50 hover:text-black"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={(e) => deleteChat(e, chat.id)}
                      className="p-1 text-black/50 hover:text-black z-10"
                    >
                      <span className="material-symbols-outlined scale-75">close</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto border-t-2 border-black bg-white relative">
          <div
            onClick={() => user ? null : setIsAuthVisible(true)}
            className="flex items-center gap-3 w-full cursor-pointer hover:bg-black/5 p-3 transition-colors group border-2 border-transparent hover:border-black"
          >
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#ccc] group-hover:scale-110 transition-transform">
              {user ? (
                <span className="font-headline font-bold text-lg">{user.name[0]}</span>
              ) : (
                <Bot size={22} />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-headline font-bold truncate text-black uppercase leading-tight">
                {user ? user.name : "LOGIN / SIGNUP"}
              </span>
              <span className="text-[10px] text-black/50 font-label uppercase tracking-tighter">
                {user ? "Identity_Confirmed" : "No active session"}
              </span>
            </div>
            {user && (
              <button
                onClick={(e) => { e.stopPropagation(); setUser(null); }}
                className="ml-auto p-1.5 hover:bg-black/5 text-black/50 hover:text-black transition-all"
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
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-0">


        <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md text-black border-b border-black md:px-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 md:hidden">
              <Menu size={26} />
            </button>
            <div className="hidden md:flex items-center pointer-events-none">
               <span className="font-headline font-bold text-lg tracking-tight">AI CONSOLE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="p-1 border-2 border-black bg-white hover:bg-black/5 transition-colors shadow-[2px_2px_0px_#888] text-red-600 hover:bg-red-50"
                title="Clear Chat"
              >
                <Trash2 size={14} />
              </button>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-white hover:bg-black/5 transition-colors shadow-[2px_2px_0px_#ccc] text-xs font-bold font-mono tracking-tighter"
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
            <div className="relative">
              <button 
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-white hover:bg-black/5 transition-colors shadow-[2px_2px_0px_#ccc] text-xs font-bold font-mono tracking-tighter"
            >
              <Bot size={14} />
              {selectedModel === "llama-3.3-70b-versatile" ? "LLaMA 70B Fast" : selectedModel}
              <ChevronDown size={14} />
            </button>
            
            {isModelDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_#ccc] flex flex-col z-50">
                <button 
                  onClick={() => { setSelectedModel("llama-3.3-70b-versatile"); setIsModelDropdownOpen(false); }}
                  className={`text-left px-4 py-2 font-mono text-[10px] uppercase font-bold hover:bg-black/5 ${selectedModel === "llama-3.3-70b-versatile" ? "text-primary border-r-4 border-black font-black bg-black/5" : "text-black"}`}
                >
                  LLaMA 70B Fast
                </button>
                <button 
                  onClick={() => { setSelectedModel("llama-8b-8192"); setIsModelDropdownOpen(false); }}
                  className={`text-left px-4 py-2 font-mono text-[10px] uppercase font-bold hover:bg-black/5 ${selectedModel === "llama-8b-8192" ? "text-primary border-r-4 border-black font-black bg-black/5" : "text-black"}`}
                >
                  LLaMA 8b Light
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="min-h-full flex flex-col items-center pt-4 pb-32 px-4 md:px-8">
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center animate-zoom-breath">
                <img src="/robot-icon.png" alt="Robot AI" className={`w-full h-full object-contain ${isDarkMode ? "invert" : ""}`} />
              </div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold mb-3 tracking-tighter text-center shimmer-text">
                WELCOME
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
                        className="px-6 py-2 border-2 border-black bg-white text-black font-headline font-bold text-xs uppercase tracking-widest shadow-[4px_4px_0px_#ddd] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
                      >
                        {showAbout ? <X size={14} /> : <Plus size={14} />}
                        PROJECT CORE
                      </button>
                    </div>
                  </div>

                  {/* Conditional About Me Section */}
                  {showAbout && (
                    <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
                      <div className="p-5 border-2 border-black bg-white shadow-[6px_6px_0px_#000] relative">
                        <div className="absolute -top-3 left-4 bg-black text-white px-3 py-0.5 font-headline font-bold text-[10px] uppercase tracking-widest">
                          SYSTEM ARCHITECTURE & CORE
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 items-start">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <div>
                              <span className="text-[8px] font-label text-black/90 font-bold uppercase block mb-1 tracking-tighter">PROJECT_NAME</span>
                              <span className="px-3 py-1.5 border-2 border-black font-body font-bold text-sm text-black bg-white inline-block shadow-[2px_2px_0px_#000]">
                                Full-Stack GenAI Assistant
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-3">
                              <div>
                                <span className="text-[8px] font-label text-black/90 font-bold uppercase block mb-1 tracking-tighter">DEVELOPER</span>
                                <span className="px-2 py-1 border-2 border-black font-body font-bold text-[10px] text-black bg-white inline-block shadow-[2px_2px_0px_#000]">
                                  Chiranjeeb Dash
                                </span>
                              </div>
                              <div>
                                <span className="text-[8px] font-label text-black/90 font-bold uppercase block mb-1 tracking-tighter">LAUNCH</span>
                                <span className="px-2 py-1 border-2 border-black font-body font-bold text-[10px] text-black bg-white inline-block shadow-[2px_2px_0px_#000]">
                                  APRIL 2026
                                </span>
                              </div>
                              <div>
                                <span className="text-[8px] font-label text-black/90 font-bold uppercase block mb-1 tracking-tighter text-blue-600">GITHUB</span>
                                <a 
                                  href="https://github.com/Chiranjeeb-Dash-Git" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 border-2 border-black font-body font-bold text-[10px] text-white bg-black hover:bg-white hover:text-black transition-all inline-block shadow-[2px_2px_0px_#ddd]"
                                >
                                  Profile ↗
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Column */}
                          <div className="space-y-3">
                            <span className="text-[8px] font-label text-black/90 font-bold uppercase block tracking-tighter">CORE_STACK</span>
                            <div className="flex flex-wrap gap-2 text-black">
                               {[
                                 "Next.js 14", "Tailwind CSS", "Groq AI", "Llama 3.3", "Express.js", "Tavily", 
                                 "PDF Parse", "Lucide Icons", "React Markdown", "Highlight.js"
                               ].map(t => (
                                 <span key={t} className="px-2.5 py-1 border-2 border-black font-body font-bold text-[10px] items-center justify-center flex hover:bg-black hover:text-white transition-colors cursor-default shadow-[2px_2px_0px_#000]">
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
            <div className="flex flex-col gap-6 mb-40 px-4 md:px-0 max-w-4xl mx-auto w-full">
              {messages.map((message, index) => (
                <div key={index} className={`group ${message.role === "user" ? "message-container-user" : "message-container-assistant"}`}>
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
                          <div className="inline break-words whitespace-pre-wrap">{message.content}</div>
                        )
                      ) : (
                        message.content || (
                          <div className="flex items-center gap-1.5 h-6 px-1">
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-[bounce_1s_infinite_0s]"></span>
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
                          onClick={() => handleSpeak(message.content)} 
                          className="p-1.5 border border-black/20 hover:bg-black/5 text-black rounded transition-all"
                          title="Read Aloud"
                        >
                          <Volume2 size={12} />
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
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Terminal Input */}
        <div className="absolute bottom-0 left-0 w-full pt-16 pb-6 px-4 md:px-6 bg-gradient-to-t from-white via-white to-white z-20">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            {(attachedFiles.length > 0 || isProcessingFile) && (
              <div className="mb-3 flex flex-wrap gap-2 animate-in slide-in-from-bottom-2 duration-300">
                {isProcessingFile && (
                  <div className="flex items-center gap-2 p-2 bg-white border-2 border-black text-black shadow-[2px_2px_0px_#888]">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Analyzing_Buffer...</span>
                  </div>
                )}
                {attachedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-white border-2 border-black text-black max-w-[200px] shadow-[2px_2px_0px_#888]">
                    {file.type === "IMAGE" ? <ImageIcon size={14} className="shrink-0" /> : <FileText size={14} className="shrink-0" />}
                    <span className="text-[10px] font-mono font-bold uppercase truncate">{file.name}</span>
                    <button type="button" onClick={() => removeAttachedFile(i)} className="p-1 hover:bg-black/5 rounded">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-black hover:scale-110 transition-transform p-2 border-2 border-black bg-white"
                >
                  <Paperclip size={20} />
                </button>
                <input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,image/*,.txt,.md,.js,.json" />

                <div
                  className="flex-grow flex items-start bg-white px-4 py-3 border-2 border-black focus-within:ring-1 focus-within:ring-black transition-colors group relative cursor-text min-h-[48px]"
                  onClick={() => textareaRef.current?.focus()}
                >
                  <div className="relative flex-grow min-h-[1.5rem] font-mono text-xs">
                    {/* Hidden Textarea for Input Handling */}
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={input ? "" : "How may I assist you?"}
                      className="absolute inset-0 w-full h-full opacity-0 z-10 font-mono text-xs cursor-text resize-none bg-transparent border-0 ring-0 focus:ring-0 outline-none p-0"
                      rows={1}
                    />

                    <div className="w-full break-all whitespace-pre-wrap text-black pointer-events-none flex flex-wrap items-center">
                      {!input && (
                        <span className="text-black/30">How may I assist you?</span>
                      )}
                      <span>{input}</span>
                      <span className="w-2 h-4 bg-black cursor-blink shrink-0 ml-0.5" />
                    </div>
                  </div>
                </div>
                <button
                   type="button"
                   onClick={toggleListening}
                   className={`text-black hover:scale-110 transition-transform p-2 border-2 ${isListening ? 'border-red-500 bg-red-50 animate-pulse' : 'border-black bg-white'}`}
                   title="Voice Typing"
                 >
                   {isListening ? <Mic size={20} className="text-red-500" /> : <MicOff size={20} />}
                </button>
                {isLoading ? (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-black bg-black text-white font-headline font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0px_#ddd] hover:bg-red-600 transition-all"
                  >
                    <StopCircle size={18} />
                    STOP
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={(!input.trim() && attachedFiles.length === 0)}
                    className="premium-button flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    EXECUTE
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
