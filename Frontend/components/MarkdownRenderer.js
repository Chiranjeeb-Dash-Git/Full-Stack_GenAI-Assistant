"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Download } from "lucide-react";

function CodeBlock({ className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([codeString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Set a basic extension based on the language, or default to txt
    const ext = match ? match[1] : "txt";
    a.download = `snippet.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative group my-6 border-2 border-black rounded-lg overflow-hidden">
      <div className="absolute top-0 right-0 p-2 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity z-10 border-l border-b border-black bg-white">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 text-black">
          {match ? match[1] : "code"}
        </span>
        <button
          onClick={handleCopy}
          className="p-1 px-2 rounded-md hover:bg-black/5 text-black transition-all flex items-center gap-1.5"
          title="Copy Code"
        >
          {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
          <span className="text-[10px] font-bold uppercase tracking-tight">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
        <button
          onClick={handleDownload}
          className="p-1 px-2 rounded-md hover:bg-black/5 text-black transition-all flex items-center gap-1.5 border-l border-black/20"
          title="Download Code"
        >
          <Download size={12} />
          <span className="text-[10px] font-bold uppercase tracking-tight">
            Save
          </span>
        </button>
      </div>
      <code
        {...props}
        className={`${className} block overflow-x-auto p-6 pt-12 bg-white text-black text-sm font-mono leading-relaxed`}
      >
        {children}
      </code>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="prose max-w-none text-black">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-black mb-6 border-b-2 border-black pb-2" {...props} />,
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-black mb-4 mt-8 bg-black/5 p-2 border-l-4 border-black" {...props} />
          ),
          code: ({ node, inline, ...props }) => {
            return !inline ? (
              <CodeBlock {...props} />
            ) : (
              <code
                {...props}
                className="bg-black/5 px-1.5 py-0.5 rounded text-black font-mono text-[0.9em] border border-black/20"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
