import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DraftProvider } from "@/context/DraftContext";
import { SiteNav } from "@/components/SiteNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harness Engineering — CLAUDE.md 기반 개발",
  description: "CLAUDE.md로 Claude Code를 활용한 하네스 엔지니어링 방법론",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DraftProvider>
          <SiteNav />
          {children}
        </DraftProvider>
      </body>
    </html>
  );
}
