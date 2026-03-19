import type { Metadata } from "next";
import { Forum, Geist, Geist_Mono, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { TelegramInit } from "@/components/layout/TelegramInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const forum = Forum({
  variable: "--font-forum",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneYield&Spend — AI-Managed DeFi Yield",
  description: "Deposit USDC. AI agents earn 5–35% APY. Spend from your yield.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Telegram Mini App SDK — no-op in regular browsers */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${forum.variable} antialiased`}
      >
        <TelegramInit />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
