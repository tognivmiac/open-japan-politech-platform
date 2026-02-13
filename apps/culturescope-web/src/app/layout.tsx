import { NavigationBar, SmoothScrollProvider, ScrollReveal } from "@ojpp/ui";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
  title: "CultureScope - 日本の文化政策を可視化",
  description: "文化庁予算・芸術振興・文化財保護を一目で把握。文化政策データを可視化し、政党の文化政策スタンスを比較する。",
  openGraph: {
    title: "CultureScope - 日本の文化政策を可視化",
    description: "文化庁予算・芸術振興・文化財保護を一目で把握。文化政策データを可視化し、政党の文化政策スタンスを比較する。",
    siteName: "Open Japan PoliTech Platform",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CultureScope - 日本の文化政策を可視化",
    description: "文化庁予算・芸術振興・文化財保護を一目で把握。文化政策データを可視化し、政党の文化政策スタンスを比較する。",
  },
};

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/budget", label: "予算推移" },
  { href: "/programs", label: "文化施策" },
  { href: "/compare", label: "政党比較" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NavigationBar
          brand="CultureScope"
          brandColor="text-amber-600"
          items={NAV_ITEMS}
          accentColor="hover:text-amber-600"
        />
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800">
          v0.1 デモ版 — 文化庁公開資料に基づく文化政策データ
        </div>
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
        <ScrollReveal>
          <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
            <p>文化政策を誰でも見える形に — AIエージェント時代の政治インフラ</p>
            <p className="mt-1">Open Japan PoliTech Platform v0.1 | AGPL-3.0</p>
          </footer>
        </ScrollReveal>
      </body>
    </html>
  );
}
