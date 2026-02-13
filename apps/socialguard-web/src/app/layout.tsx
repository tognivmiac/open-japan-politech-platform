import { NavigationBar, SmoothScrollProvider, ScrollReveal } from "@ojpp/ui";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
  title: "SocialGuard - 社会保障データダッシュボード",
  description:
    "年金・医療・介護・子育て支援を一目で把握。社会保障関係費の推移や制度一覧、都道府県比較、政党スタンスを可視化する。",
  openGraph: {
    title: "SocialGuard - 社会保障データダッシュボード",
    description:
      "年金・医療・介護・子育て支援を一目で把握。社会保障関係費の推移や制度一覧、都道府県比較、政党スタンスを可視化する。",
    siteName: "Open Japan PoliTech Platform",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialGuard - 社会保障データダッシュボード",
    description:
      "年金・医療・介護・子育て支援を一目で把握。社会保障関係費の推移や制度一覧、都道府県比較、政党スタンスを可視化する。",
  },
};

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/budget", label: "予算推移" },
  { href: "/programs", label: "制度一覧" },
  { href: "/prefectures", label: "都道府県" },
  { href: "/compare", label: "政党比較" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NavigationBar
          brand="SocialGuard"
          brandColor="text-emerald-600"
          items={NAV_ITEMS}
          accentColor="hover:text-emerald-600"
        />
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-center text-xs text-emerald-800">
          v0.1 デモ版 — 厚生労働省・財務省公開資料に基づく社会保障データ
        </div>
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
        <ScrollReveal>
          <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
            <p>社会保障を誰でも見える形に — AIエージェント時代の政治インフラ</p>
            <p className="mt-1">Open Japan PoliTech Platform v0.1 | AGPL-3.0</p>
          </footer>
        </ScrollReveal>
      </body>
    </html>
  );
}
