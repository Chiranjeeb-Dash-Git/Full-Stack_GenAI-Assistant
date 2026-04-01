import "./globals.css";

export const metadata = {
  title: "AI Intelligence",
  description: "AI assistant powered by Grok API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black flex h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
