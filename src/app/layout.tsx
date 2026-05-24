import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI BUDDY by Millionminds",
  description: "AI-powered Talent-as-a-Service prototype for students, startups, and mentors."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
