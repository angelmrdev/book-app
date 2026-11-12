import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-ui", subsets: ["latin"], display: "swap" });
const lora = Lora({ variable: "--font-editorial", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Reading Platform | Your Reading Partner",
  description: "Discover books, build your personal library and make every chapter count. Your reading journey belongs here.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${dmSans.variable} ${lora.variable}`}><body>{children}</body></html>;
}
