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

const browserExtensionAttributeCleanup = `
(() => {
  const attributes = ["bis_skin_checked"];

  const cleanNode = (node) => {
    if (!(node instanceof Element)) {
      return;
    }

    for (const attribute of attributes) {
      node.removeAttribute(attribute);
    }

    for (const attribute of attributes) {
      node.querySelectorAll("[" + attribute + "]").forEach((child) => {
        child.removeAttribute(attribute);
      });
    }
  };

  cleanNode(document.documentElement);

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName &&
        attributes.includes(mutation.attributeName)
      ) {
        mutation.target.removeAttribute(mutation.attributeName);
      }

      mutation.addedNodes.forEach(cleanNode);
    }
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: attributes,
    childList: true,
    subtree: true,
  });
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

