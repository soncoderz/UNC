import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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

const browserExtensionAttributeCleanup = `
(() => {
  const attributeName = "bis_skin_checked";

  const cleanNode = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    if (node.hasAttribute(attributeName)) {
      node.removeAttribute(attributeName);
    }

    node.querySelectorAll?.("[" + attributeName + "]").forEach((child) => {
      child.removeAttribute(attributeName);
    });
  };

  cleanNode(document.documentElement);

  if (window.MutationObserver) {
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          cleanNode(mutation.target);
          return;
        }

        mutation.addedNodes.forEach(cleanNode);
      });
    }).observe(document.documentElement, {
      attributeFilter: [attributeName],
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
})();
`;


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Script
          id="browser-extension-attribute-cleanup"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: browserExtensionAttributeCleanup }}
        />
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

