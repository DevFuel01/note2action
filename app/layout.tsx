import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note2Action - AI-Powered Task Extraction",
  description: "Transform unstructured notes into clear, actionable tasks using AI",
  keywords: ["productivity", "AI", "task management", "notes", "Gemini"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
