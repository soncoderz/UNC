"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY_INFO, NAV_ITEMS } from "@/constants/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

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

const getNavIcon = (label: string) => {
  switch (label) {
    case "Milestone":
      return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
    case "Honor":
      return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "Company Introduction":
      return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      );
    case "Corporate News":
      return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      );
    default:
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      );
  }
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const languageSelectorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isScrolled: isScrolledFromHook } = useScrollPosition();
  const { availableLocales, locale, switchLanguage, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  // Force solid navbar on admin routes because they don't have a dark hero section
  const isScrolled = isScrolledFromHook || pathname?.startsWith("/admin");

  useEffect(() => { setMounted(true); }, []);


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
              className={`block w-full px-6 py-3 text-center text-sm transition-colors ${locale === lang
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

  if (!mounted) {
    return <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-transparent" />;
  }

  return (
    <header
      onMouseLeave={() => setActiveDropdown(null)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white shadow-md"
        : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="hidden lg:flex items-center justify-between h-[72px] w-full">
          {/* Left: Logo + Nav grouped */}
          <div className="flex items-center gap-8 xl:gap-12">
            <Link href="/" className="flex items-center shrink-0">
              <span
                className="font-extrabold text-[36px] xl:text-[40px] tracking-tight leading-none italic select-none transition-colors duration-300"
                style={{ fontFamily: "var(--font-heading), 'Arial Black', sans-serif" }}
              >
                <span className={isScrolled ? "text-[#1a6fef]" : "text-white"}>U</span>
                <span className="text-[#f97316]" style={{ letterSpacing: "-2px" }}>N</span>
                <span className={isScrolled ? "text-[#1a6fef]" : "text-white"}>C</span>
              </span>
            </Link>

            <nav className="flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative group h-[72px] flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium transition-colors duration-200 relative whitespace-nowrap flex items-center h-[72px] ${isActive(item.href)
                      ? "text-[#f97316] font-semibold"
                      : isScrolled
                        ? "text-[#333] hover:text-[#f97316]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t(navLabelKeys[item.href] || item.label)}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[#f97316] rounded-t-sm" />
                    )}
                  </Link>

                  {/* Standard dropdown for non-About Us items */}
                  {item.children && activeDropdown === item.label && item.label !== "About Us" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-72 bg-white shadow-lg border border-gray-100 py-2 z-50 rounded-b-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-[#333] hover:text-[#f97316] hover:bg-orange-50/60 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {t(childLabelKeys[child.href] || child.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Auth & Language Selector */}
          <div className="flex items-center gap-4 xl:gap-6 justify-end shrink-0">
            {/* Auth section */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm ${isScrolled ? "text-dark" : "text-white"}`}>
                  Hi, {user?.name.split(" ")[0]}
                </span>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`text-sm font-medium transition-colors ${
                      isScrolled ? "text-primary hover:text-dark" : "text-[#f97316] hover:text-white"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? "text-red-600 hover:text-red-700" : "text-white/80 hover:text-white"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : null}

            {/* Separator */}
            <div className={`h-4 w-px ${isScrolled ? "bg-gray-200" : "bg-white/20"}`} />

            {languageSelector}
          </div>
        </div>

        {/* Mobile: flex layout */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="font-extrabold text-[28px] tracking-tight leading-none italic select-none transition-colors duration-300"
              style={{ fontFamily: "var(--font-heading), 'Arial Black', sans-serif" }}
            >
              <span className={isScrolled ? "text-[#1a6fef]" : "text-white"}>U</span>
              <span className="text-[#f97316]" style={{ letterSpacing: "-2px" }}>N</span>
              <span className={isScrolled ? "text-[#1a6fef]" : "text-white"}>C</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-dark" : "text-white"}`}
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

      {isMobileMenuOpen ? (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <div className="flex flex-wrap items-center gap-2 px-4 pb-3 mb-2 border-b border-gray-100">
              {availableLocales.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${locale === lang
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
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
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

      {/* ===== MEGA MENU FOR "About Us" ===== */}
      {activeDropdown === "About Us" && (
        <div
          className="hidden lg:block absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-40 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setActiveDropdown("About Us")}
        >
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-start gap-8 xl:gap-24 px-10">
              {NAV_ITEMS.find((i) => i.label === "About Us")?.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex items-center gap-4 group"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="relative flex items-center justify-center w-12 h-12 text-[#1a6fef] group-hover:scale-110 transition-transform duration-300">
                    {/* Background glow circle */}
                    <div className="absolute inset-0 bg-[#eef5fe] rounded-full scale-100 shadow-sm" />
                    {/* SVG Icon on top */}
                    <div className="relative z-10 w-6 h-6">
                      {getNavIcon(child.label)}
                    </div>
                  </div>
                  <span className="text-[#4b5563] font-medium text-[15px] group-hover:text-[#f97316] transition-colors whitespace-nowrap">
                    {t(childLabelKeys[child.href] || child.label)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
