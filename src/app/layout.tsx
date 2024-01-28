import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Gusto",
  description: "Help you manage your cooking recipes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background bg-neutral-50 font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
