"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY_INFO, NAV_ITEMS } from "@/constants/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";
import { useLanguage } from "@/context/LanguageContext";

const languageLabels = {
  zh: "中文",
  en: "En",
  vi: "VI",
  de: "DE",
  es: "ES",
} as const;

const navLabelKeys: Record<string, string> = {
  "/": "nav.home",
  "/company": "nav.aboutUs",
  "/solutions": "nav.solutions",
  "/products": "nav.productsCenter",
  "/rnd": "nav.rnd",
  "/support": "nav.technicalSupport",
  "/contact": "nav.contact",
};

const childLabelKeys: Record<string, string> = {
  "/company#milestone": "company.journeyTitle",
  "/company#honor": "company.certificationsTitle",
  "/company#intro": "company.storyTitle",
  "/news": "home.corporateNews",
  "/solutions/household": "nav.solutionHousehold",
  "/solutions/commercial": "nav.solutionCommercial",
  "/solutions/photovoltaic": "nav.solutionPhotovoltaic",
  "/products?category=hybrid-inverters": "products.hybridInverters",
  "/products?category=energy-storage": "products.energyStorage",
  "/products?category=pv-inverters": "products.pvInverters",
  "/rnd#research": "nav.rndCapabilities",
  "/rnd#produce": "nav.batchProduction",
  "/rnd#quality": "nav.qualityAssurance",
  "/support#technical": "nav.technicalSupport",
  "/support#afterSales": "nav.postSale",
  "/support#download": "nav.dataDownload",
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageSelectorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const { availableLocales, locale, switchLanguage, t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0].split("#")[0]);
  };

  useEffect(() => {
    if (!isLanguageOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLanguageOpen]);

  const languageSelector = (
    <div className="relative" ref={languageSelectorRef}>
      <button
        type="button"
        onClick={() => setIsLanguageOpen((open) => !open)}
        className={`lang-selector ${isScrolled ? "scrolled" : ""}`}
        aria-expanded={isLanguageOpen}
        aria-label={t("common.selectLanguage")}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{languageLabels[locale]}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isLanguageOpen ? (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white shadow-xl border border-gray-100 py-3 z-50">
          {availableLocales.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                switchLanguage(lang);
                setIsLanguageOpen(false);
              }}
              className={`block w-full px-6 py-3 text-center text-sm transition-colors ${
                locale === lang
                  ? "font-semibold text-primary"
                  : "font-normal text-dark hover:text-primary hover:bg-blue-50"
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/unc-logo.png"
              alt={COMPANY_INFO.name}
              width={100}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative ${
                    isActive(item.href)
                      ? isScrolled
                        ? "text-primary font-bold"
                        : "text-white font-bold"
                      : isScrolled
                      ? "text-dark-light hover:text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {t(navLabelKeys[item.href] || item.label)}
                  {isActive(item.href) ? (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full" />
                  ) : null}
                </Link>

                {item.children && activeDropdown === item.label ? (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white shadow-xl border border-gray-100 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-dark-light hover:text-primary hover:bg-blue-50 transition-colors"
                      >
                        {t(childLabelKeys[child.href] || child.label)}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">{languageSelector}</div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-dark" : "text-white"
              }`}
              aria-label={t("common.toggleMenu")}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <div className="flex flex-wrap items-center gap-2 px-4 pb-3 mb-2 border-b border-gray-100">
              {availableLocales.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    locale === lang
                      ? "bg-primary text-white"
                      : "text-dark-light hover:text-primary hover:bg-blue-50"
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-blue-50"
                      : "text-dark-light hover:text-primary hover:bg-blue-50"
                  }`}
                >
                  {t(navLabelKeys[item.href] || item.label)}
                </Link>
                {item.children ? (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray hover:text-primary transition-colors"
                      >
                        {t(childLabelKeys[child.href] || child.label)}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
