"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Cpu, ShieldCheck, Zap, Cog, Activity, Fingerprint, DoorOpen } from "lucide-react";

export default function Auth({ onClose, onLogin, currentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setIsScanning(prev => !prev), 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Load registry
    const registry = JSON.parse(localStorage.getItem("user_registry") || "[]");

    if (isLogin) {
      // Login Logic
      const foundUser = registry.find(u => u.email === email && u.password === password);
      if (foundUser) {
        onLogin(foundUser);
        onClose();
      } else {
        setError("DECRYPTION FAILED: IDENTITY NOT FOUND");
      }
    } else {
      // Signup Logic
      if (registry.some(u => u.email === email)) {
        setError("CONFLICT: IDENTITY ALREADY REGISTERED");
        return;
      }
      
      const newUser = { name: name || "Unknown Operator", email, password };
      const updatedRegistry = [...registry, newUser];
      localStorage.setItem("user_registry", JSON.stringify(updatedRegistry));
      
      onLogin(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/50 backdrop-blur-md animate-in fade-in duration-500">
      <div className={`relative w-full max-w-lg border-2 ${error ? 'border-red-600' : 'border-black'} bg-white p-8 md:p-12 shadow-[10px_10px_0px_#000] transition-all duration-500`}>
        
        {currentUser && (
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-black hover:bg-black/5 transition-all"
          >
            <X size={24} />
          </button>
        )}

        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-6">
            <div className={`w-20 h-20 border-2 ${error ? 'border-red-600' : 'border-black'} flex items-center justify-center bg-white shadow-[4px_4px_0px_#000]`}>
              <Cpu size={40} className="text-black" />
            </div>
          </div>

          <h2 className="text-2xl font-headline font-bold tracking-tight text-black uppercase">
            {error ? "ACCESS DENIED" : (isLogin ? "USER LOGIN" : "CREATE ACCOUNT")}
          </h2>
          
          {error && (
            <div className="mt-4 p-3 border-2 border-red-600 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <input 
                type="text" 
                placeholder="FULL NAME"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border-2 border-black p-4 text-xs font-bold tracking-widest outline-none focus:bg-black/5 placeholder:text-black/30"
              />
            </div>
          )}
          
          <div className="relative">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-black p-4 text-xs font-bold tracking-widest outline-none focus:bg-black/5 placeholder:text-black/30"
            />
          </div>

          <div className="relative">
            <input 
              type="password" 
              placeholder="PASSWORD"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-black p-4 text-xs font-bold tracking-widest outline-none focus:bg-black/5 placeholder:text-black/30"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest shadow-[4px_4px_0px_#ccc] hover:bg-black/90 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>

          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest shadow-[4px_4px_0px_#ccc] hover:bg-black/90 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            {isLogin ? "CREATE NEW ACCOUNT" : "RETURN TO LOGIN"}
          </button>

          <button 
            type="button" 
            onClick={onClose}
            className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest shadow-[4px_4px_0px_#ccc] hover:bg-black/90 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            STAY AS GUEST
          </button>
        </form>
      </div>
    </div>
  );
}
