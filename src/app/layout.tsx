import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Open_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next/types";

import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";

import Providers from "@/app/Providers";

import { cn } from "@/libs/utils";

import "./globals.css";

const fontSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gusto-hazel.vercel.app"),
  title: {
    template: "%s | 구스토",
    default: "구스토 - 레시피 영상 요약",
  },
  description: "구스토에서 AI로 레시피 영상을 요약해보세요!",
  keywords: [
    "구스토",
    "Gusto",
    "유튜브 레시피",
    "레시피",
    "레시피 관리",
    "영상 요약",
    "레시피 생성",
    "정보 이해",
    "AI 기반 서비스",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "구스토 - 레시피 영상 요약 | Gusto",
    siteName: "구스토",
    description:
      "구스토에서 AI를 통해 요리 영상을 요약하고 레시피를 정리해보세요",
    url: "https://gusto-hazel.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
  colorScheme: "light",
  initialScale: 1,
  width: "device-width",
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          "flex min-h-dvh flex-col bg-neutral-200 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <main className="mx-auto flex w-full max-w-md flex-[1_1_0] flex-col items-center bg-neutral-100 pb-16">
            {children}
          </main>
          <NavBar />
          <Toaster />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
