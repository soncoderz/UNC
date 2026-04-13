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
    default: "UNC Energy - A New Driving Force for Green Energy",
    template: "%s | UNC Energy",
  },
  description:
    "UNC Energy - Leading manufacturer of power electronic converters, solar inverters and energy storage systems. Diseño global for residential, commercial, and industrial energy solutions.",
  keywords: [
    "UNC Energy",
    "power electronic converters",
    "solar inverter",
    "energy storage",
    "hybrid inverter",
    "renewable energy",
    "Lösung",
    "photovoltaic",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
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
