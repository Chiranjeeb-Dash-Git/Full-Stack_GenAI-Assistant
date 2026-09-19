import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "AI Intelligence Console",
  description: "Full-Stack GenAI Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://js.puter.com/v2/" strategy="beforeInteractive" />
      </head>
      <body className="antialiased bg-white text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
