"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, LockKeyhole, UserRound, Github, X, Home as HomeIcon } from "lucide-react";

export default function Auth({ onClose, onLogin, currentUser, onHome }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const switchMode = (nextMode) => { setMode(nextMode); setError(""); setPassword(""); };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (mode === "signup" && !agreed) { setError("Please agree to the terms to create an account."); return; }
    setIsSubmitting(true);
    const registry = JSON.parse(localStorage.getItem("user_registry") || "[]");
    if (mode === "login") {
      const foundUser = registry.find(user => user.email === email && user.password === password);
      if (!foundUser) { setError("Email or password is incorrect."); setIsSubmitting(false); return; }
      if (remember) localStorage.setItem("remembered_email", email);
      onLogin(foundUser); onClose();
    } else {
      if (!name.trim() || !email.trim() || password.length < 6) { setError("Use your name, a valid email, and a password of at least 6 characters."); setIsSubmitting(false); return; }
      if (registry.some(user => user.email === email)) { setError("An account with this email already exists."); setIsSubmitting(false); return; }
      const newUser = { name: name.trim(), email: email.trim(), password };
      localStorage.setItem("user_registry", JSON.stringify([...registry, newUser]));
      onLogin(newUser); onClose();
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-field" aria-hidden="true"><div className="auth-orb-wrap auth-orb-one"><div className="auth-orb" /></div><div className="auth-orb-wrap auth-orb-two"><div className="auth-orb" /></div><div className="auth-orb-wrap auth-orb-three"><div className="auth-orb" /></div></div>
      <div className="auth-shell">
        <section className="auth-brand-panel">
          <div className="auth-brand"><span className="auth-brand-mark" /> Full-Stack GenAI Assistant</div>
          <div className="auth-icon-field" aria-hidden="true"><div className="auth-icon-tile auth-tile-one">💬</div><div className="auth-icon-tile auth-tile-two">🎙️</div><div className="auth-icon-tile auth-tile-three">📄</div><div className="auth-icon-tile auth-tile-four">✦</div><div className="auth-icon-tile auth-tile-five">◐</div></div>
          <div><div className="auth-waveform" aria-hidden="true">{[40, 75, 100, 55, 88, 35, 95, 60].map((height, index) => <span key={index} style={{ height: `${height}%`, animationDelay: `${index / 10}s` }} />)}</div><h2>Talk to it. It talks back.</h2><p>Sign in to pick up your conversation exactly where you left it — streaming replies, voice in and out, all in one console.</p><div className="auth-foot-note">Built for developers building with modern AI.</div></div>
        </section>
        <section className="auth-form-panel">
          <div className="auth-top-actions">{onHome && <button type="button" onClick={onHome} className="auth-home-button"><HomeIcon size={14} /> Home</button>}<button type="button" onClick={onClose} className="auth-close-button" aria-label="Close login screen"><X size={18} /></button></div>
          <div className={`auth-tabs ${mode === "signup" ? "auth-tabs-signup" : ""}`}><div className="auth-tab-indicator" /><button type="button" className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => switchMode("login")}>Log in</button><button type="button" className={`auth-tab ${mode === "signup" ? "active" : ""}`} onClick={() => switchMode("signup")}>Sign up</button></div>
          <form className="auth-form-view" onSubmit={handleSubmit}>
            <h3>{mode === "login" ? "Welcome back" : "Create your account"}</h3><p className="auth-form-sub">{mode === "login" ? "Log in to continue your conversation." : "Start streaming your first conversation in seconds."}</p>
            {error && <div className="auth-error" role="alert">{error}</div>}
            {mode === "signup" && <label className="auth-field-group"><input type="text" placeholder="Full name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" /><span className="auth-field-icon"><UserRound size={15} /></span></label>}
            <label className="auth-field-group"><input type="email" placeholder="Email address" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required /><span className="auth-field-icon"><Mail size={15} /></span></label>
            <label className="auth-field-group"><input type={showPassword ? "text" : "password"} placeholder={mode === "login" ? "Password" : "Create password"} value={password} onChange={event => setPassword(event.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} required /><span className="auth-field-icon"><LockKeyhole size={15} /></span><button type="button" className="auth-eye" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></label>
            <div className="auth-row-between"><label className="auth-check"><input type="checkbox" checked={mode === "login" ? remember : agreed} onChange={event => mode === "login" ? setRemember(event.target.checked) : setAgreed(event.target.checked)} /> {mode === "login" ? "Remember me" : "I agree to the terms"}</label>{mode === "login" && <button type="button" className="auth-forgot" onClick={() => setError("Password recovery is not configured yet.")}>Forgot password?</button>}</div>
            <button type="submit" className="auth-submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}</button>
            <div className="auth-divider">or continue with</div><div className="auth-social-row"><button type="button" className="auth-social" onClick={() => setError("Google sign-in is not configured yet.")}><span>G</span> Google</button><button type="button" className="auth-social" onClick={() => setError("GitHub sign-in is not configured yet.")}><span><Github size={14} /></span> GitHub</button></div>
            <button type="button" className="auth-guest" onClick={onClose}>Continue as guest</button>
            <div className="auth-switch-line">{mode === "login" ? "Don't have an account?" : "Already have an account?"} <button type="button" onClick={() => switchMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Sign up" : "Log in"}</button></div>
          </form>
        </section>
      </div>
    </div>
  );
}
