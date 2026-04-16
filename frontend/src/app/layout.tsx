import { Inter, Outfit } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PV Inverter | Solar Inverter | Off Grid Inverter | UNC Technology",
    template: "%s | UNC Technology",
  },
  description:
    "China UNC Technology products cover household PV inverter, solar inverter, off grid inverter, energy storage systems, and power conversion technology.",
  keywords: [
    "UNC Technology",
    "PV inverter",
    "solar inverter",
    "off grid inverter",
    "energy storage systems",
    "solar energy company",
    "power electronic converters",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
