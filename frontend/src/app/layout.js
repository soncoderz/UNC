import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

export const metadata = {
  title: {
    default: "SolarTech Energy - Powering the Future with Clean Energy",
    template: "%s | SolarTech Energy",
  },
  description:
    "Leading manufacturer of solar inverters and energy storage systems. High-efficiency PV inverters, battery storage, and hybrid solutions for residential, commercial, and utility-scale projects.",
  keywords: [
    "solar inverter",
    "PV inverter",
    "energy storage",
    "battery storage",
    "hybrid inverter",
    "renewable energy",
    "solar panel",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
