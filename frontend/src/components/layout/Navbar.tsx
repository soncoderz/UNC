"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_ITEMS, PRODUCT_CATEGORIES } from "@/constants/navigation";
import {
  aboutNav,
  asset,
  cloneProducts,
  productNav,
  rndNav,
  solutionNav,
  supportNav,
} from "@/data/uniconvtor";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import useScrollPosition from "@/hooks/useScrollPosition";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getProducts } from "@/services/api";

const PRODUCT_MENU_LABEL = "Product Center";
const DEFAULT_PRODUCT_CATEGORY = "hybrid-inverters";
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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

const productCategoryLabelKeys = {
  "hybrid-inverters": "products.hybridInverters",
  "energy-storage": "products.energyStorage",
  "pv-inverters": "products.pvInverters",
} as const;

type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

const dropdownVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.2, ease: EASE },
  },
};

const productCardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE },
  },
};

const mobilePanelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: EASE },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: EASE },
  },
};

const dropdownIconItems = [...aboutNav, ...solutionNav, ...rndNav, ...supportNav];

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function findDropdownIcon(href: string) {
  return dropdownIconItems.find((item) => item.href === href)?.icon;
}

export default function Navbar() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeProductCategory, setActiveProductCategory] =
    useState<ProductCategoryId>(DEFAULT_PRODUCT_CATEGORY);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [menuProducts, setMenuProducts] = useState(cloneProducts);
  const languageSelectorRef = useRef<HTMLDivElement>(null);
  const mobileLanguageSelectorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const { availableLocales, locale, switchLanguage, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const isUtilityRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/login");
  const isProductMegaOpen = activeDropdown === PRODUCT_MENU_LABEL;
  const activeDropdownItem = NAV_ITEMS.find((item) => item.label === activeDropdown);
  const showStandardDropdown =
    Boolean(activeDropdownItem?.children?.length) && !isProductMegaOpen;
  const headerSolid =
    Boolean(isScrolled) ||
    Boolean(isUtilityRoute) ||
    isHeaderHovered ||
    isMobileMenuOpen ||
    activeDropdown !== null;

  const currentProducts = useMemo(
    () => menuProducts.filter((product) => product.category === activeProductCategory),
    [activeProductCategory, menuProducts]
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return Boolean(pathname?.startsWith(href.split("?")[0].split("#")[0]));
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchMenuProducts() {
      try {
        const response = await getProducts();

        if (!cancelled && response.data?.length) {
          setMenuProducts(response.data);
        }
      } catch {
        setMenuProducts(cloneProducts);
      }
    }

    void fetchMenuProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLanguageOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      const clickedDesktopSelector = languageSelectorRef.current?.contains(target);
      const clickedMobileSelector = mobileLanguageSelectorRef.current?.contains(target);

      if (!clickedDesktopSelector && !clickedMobileSelector) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isLanguageOpen]);

  useEffect(() => {
    if (!activeDropdown && !isMobileMenuOpen && !isLanguageOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeDropdown, isLanguageOpen, isMobileMenuOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-[100] w-full border-b transition-all duration-500 max-lg:!border-slate-200 max-lg:!bg-white max-lg:!shadow-sm ${
        headerSolid
          ? "border-slate-200 bg-white shadow-[0_0_40px_rgba(0,0,0,0.16)]"
          : "border-white/80 bg-white/10"
      }`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        setActiveDropdown(null);
      }}
    >
      <div className="flex h-[52px] items-center justify-between px-[7%] transition-colors duration-500 lg:h-[clamp(76px,5.104vw,98px)] lg:px-[5%]">
        <Link
          href="/"
          className="relative block h-[30px] w-[96px] shrink-0 overflow-visible lg:h-auto lg:w-[clamp(120px,8.125vw,156px)]"
          aria-label="UNC Technology home"
          onClick={closeMenus}
        >
          <span className="relative hidden aspect-[156/95] w-full lg:block">
            <RemoteImage
              src="/template/default/esimg/img/logo1.png"
              alt="UNC Technology"
              fill
              sizes="156px"
              className={`object-contain transition-opacity duration-300 ${
                headerSolid ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            <RemoteImage
              src="/template/default/esimg/img/logo2.png"
              alt="UNC Technology"
              fill
              sizes="156px"
              className={`object-contain transition-opacity duration-300 ${
                headerSolid ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          </span>
          <span className="relative block h-full w-full lg:hidden">
            <RemoteImage
              src="/template/default/esimg/img/logo2.png"
              alt="UNC Technology"
              fill
              sizes="96px"
              className="object-contain"
              priority
            />
          </span>
        </Link>

        <nav className="hidden h-full w-[70%] items-center justify-between gap-4 lg:mr-[3%] lg:flex">
          {NAV_ITEMS.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const open = activeDropdown === item.label;
            const active = isActive(item.href);

            return (
              <div
                key={item.href}
                className="flex h-full items-center"
                onMouseEnter={() => setActiveDropdown(hasChildren ? item.label : null)}
                onFocus={() => setActiveDropdown(hasChildren ? item.label : null)}
              >
                <Link
                  href={item.href}
                  className={`relative flex h-full items-center whitespace-nowrap text-[clamp(14px,0.9375vw,18px)] font-bold transition-colors duration-300 ${
                    active || open
                      ? "text-[#ff7632]"
                      : headerSolid
                        ? "text-[#373737] hover:text-[#ff7632]"
                        : "text-white hover:text-[#ff7632]"
                  }`}
                  aria-haspopup={hasChildren ? "true" : undefined}
                  aria-expanded={hasChildren ? open : undefined}
                >
                  {t(navLabelKeys[item.href] || item.label)}
                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded bg-[#ff7632] transition-all duration-500 ${
                      active || open
                        ? "w-[140%] shadow-[0_0_20px_10px_rgba(255,118,50,0.2)]"
                        : "w-0"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center lg:flex" ref={languageSelectorRef}>
          <button
            type="button"
            onClick={() => setIsLanguageOpen((open) => !open)}
            className={`relative flex cursor-pointer items-center gap-[0.52vw] text-[clamp(14px,0.833vw,16px)] transition-colors ${
              headerSolid ? "text-[#333]" : "text-white"
            }`}
            aria-label={t("common.selectLanguage")}
            aria-expanded={isLanguageOpen}
          >
            <span className="relative block h-[1.51vw] min-h-[22px] w-[1.51vw] min-w-[22px]">
              <RemoteImage
                src={
                  headerSolid
                    ? "/template/default/esimg/icon/yuyan_b.png"
                    : "/template/default/esimg/icon/yuyan_a.png"
                }
                alt=""
                fill
                sizes="30px"
                className="object-contain"
              />
            </span>
            <span>{languageLabels[locale]}</span>
            <Chevron open={isLanguageOpen} />
          </button>

          <AnimatePresence>
            {isLanguageOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute right-[5%] top-[calc(100%-18px)] w-[120px] overflow-hidden bg-white shadow-xl"
              >
                {availableLocales.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      switchLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`block w-full px-5 py-3 text-center text-sm transition-colors ${
                      locale === lang
                        ? "font-bold text-[#0674fc]"
                        : "text-[#333] hover:text-[#0674fc]"
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
                {isAuthenticated ? (
                  <div className="border-t border-slate-100 px-3 py-2 text-center text-xs text-slate-500">
                    <p className="truncate">{user?.name}</p>
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        className="mt-1 block font-semibold text-[#0674fc]"
                        onClick={() => setIsLanguageOpen(false)}
                      >
                        Admin
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className="mt-1 font-semibold text-red-600"
                      onClick={() => {
                        logout();
                        setIsLanguageOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div
          className="relative ml-auto mr-3 flex items-center lg:hidden"
          ref={mobileLanguageSelectorRef}
        >
          <button
            type="button"
            onClick={() => setIsLanguageOpen((open) => !open)}
            className="flex h-8 items-center gap-1 text-[12px] font-medium text-[#333]"
            aria-label={t("common.selectLanguage")}
            aria-expanded={isLanguageOpen}
          >
            <span className="relative block h-[16px] w-[16px]">
              <RemoteImage
                src="/template/default/esimg/icon/yuyan_b.png"
                alt=""
                fill
                sizes="16px"
                className="object-contain"
              />
            </span>
            <span>{languageLabels[locale]}</span>
            <Chevron open={isLanguageOpen} />
          </button>

          <AnimatePresence>
            {isLanguageOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute right-0 top-[calc(100%+6px)] z-[130] w-[42px] overflow-hidden bg-[#666] shadow-lg"
              >
                {availableLocales.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      switchLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`block h-[28px] w-full text-center text-[11px] font-medium ${
                      locale === lang
                        ? "bg-[#0674fc] text-white"
                        : "text-white hover:bg-[#777]"
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen((open) => !open);
            setActiveDropdown(null);
          }}
          className="relative block h-[27px] w-[27px] shrink-0 lg:hidden"
          aria-label={t("common.toggleMenu")}
          aria-expanded={isMobileMenuOpen}
        >
          <RemoteImage
            src="/template/default/esimg/icon/nav_btn.png"
            alt=""
            fill
            sizes="32px"
            className="object-contain"
          />
        </button>
      </div>

      <AnimatePresence>
        {showStandardDropdown && activeDropdownItem?.children ? (
          <motion.div
            className="absolute left-0 top-full hidden w-full flex-wrap items-center bg-white px-[13.6%] shadow-[rgba(0,0,0,0.2)_0_20px_30px_-20px] lg:flex"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => setActiveDropdown(activeDropdownItem.label)}
          >
            {activeDropdownItem.children.map((child) => {
              const icon = findDropdownIcon(child.href);

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={closeMenus}
                  className="group relative flex h-[clamp(112px,7.291vw,140px)] w-[clamp(250px,17.187vw,330px)] items-center overflow-hidden pl-[clamp(22px,1.823vw,35px)] transition duration-500 hover:bg-[url('/uniconvtor/template/default/esimg/img/nav_bg2.png')] hover:bg-cover hover:bg-center"
                >
                  {icon ? (
                    <span className="relative mr-3 block h-[clamp(44px,3.125vw,60px)] w-[clamp(44px,3.125vw,60px)] shrink-0">
                      <RemoteImage
                        src={icon}
                        alt=""
                        fill
                        sizes="60px"
                        className="object-contain"
                      />
                    </span>
                  ) : null}
                  <span className="text-[clamp(13px,0.833vw,16px)] leading-tight text-[#333] transition group-hover:text-[#0674fc]">
                    {t(childLabelKeys[child.href] || child.label)}
                  </span>
                  <span className="absolute right-0 top-1/2 h-0 w-[4px] -translate-y-1/2 bg-gradient-to-t from-[#0572fd] to-[#2bb5fc] transition-all duration-500 group-hover:h-[60px]" />
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isProductMegaOpen ? (
          <motion.div
            className="navbar-scrollbar-hidden absolute left-0 top-full hidden w-full overflow-y-auto bg-white shadow-[rgba(0,0,0,0.2)_0_20px_30px_-20px] lg:block"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => setActiveDropdown(PRODUCT_MENU_LABEL)}
          >
            <div className="grid h-[clamp(430px,28.958vw,556px)] grid-cols-[minmax(390px,31.145vw)_1fr]">
              <div
                className="navbar-scrollbar-hidden overflow-y-auto bg-left bg-no-repeat py-[clamp(28px,2.604vw,50px)] pl-[clamp(165px,17.396vw,334px)] pr-5"
                style={{
                  backgroundImage: `url(${asset("/template/default/esimg/img/nav_bg1.png")})`,
                  backgroundSize: "min(31.145vw, 598px) 100%",
                }}
              >
                {PRODUCT_CATEGORIES.map((category) => {
                  const icon = productNav.find((item) => item.href.includes(category.id))?.icon;
                  const active = activeProductCategory === category.id;

                  return (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      onClick={closeMenus}
                      onMouseEnter={() => setActiveProductCategory(category.id)}
                      onFocus={() => setActiveProductCategory(category.id)}
                      className="group relative mb-[clamp(18px,1.562vw,30px)] flex min-h-[60px] items-center"
                    >
                      {icon ? (
                        <span className="relative mr-[10px] block h-[clamp(46px,3.125vw,60px)] w-[clamp(46px,3.125vw,60px)] shrink-0">
                          <RemoteImage
                            src={icon}
                            alt=""
                            fill
                            sizes="60px"
                            className="object-contain"
                          />
                        </span>
                      ) : null}
                      <span
                        className={`text-[clamp(14px,0.9375vw,18px)] leading-tight transition ${
                          active ? "font-bold text-[#0674fc]" : "text-[#373737] group-hover:text-[#0674fc]"
                        }`}
                      >
                        {t(productCategoryLabelKeys[category.id])}
                      </span>
                      <span
                        className={`absolute right-0 top-0 h-[60px] w-[4px] bg-gradient-to-t from-[#0572fd] to-[#2bb5fc] transition-opacity ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              <motion.div
                key={activeProductCategory}
                className="navbar-scrollbar-hidden grid auto-rows-max grid-cols-4 content-start gap-x-[8%] gap-y-[clamp(24px,1.562vw,30px)] overflow-y-auto bg-white px-[clamp(44px,3.438vw,66px)] py-[clamp(28px,1.562vw,30px)] pr-[8%]"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.08 },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {currentProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={productCardVariants}
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      onClick={closeMenus}
                      className="group block rounded-sm p-2 text-center transition hover:shadow-xl"
                    >
                      <span className="relative mb-[10px] block aspect-square w-full overflow-hidden bg-white">
                        <RemoteImage
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="180px"
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <span className="block text-[clamp(13px,0.833vw,16px)] leading-snug text-[#373737] transition group-hover:text-[#0674fc]">
                        {product.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.nav
            className="fixed left-0 right-0 top-[52px] overflow-hidden bg-white shadow-xl lg:hidden"
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="navbar-scrollbar-hidden max-h-[calc(100dvh-110px)] overflow-y-auto px-[7%] py-3">
              {NAV_ITEMS.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const expanded = mobileExpanded === item.label;

                return (
                  <div key={item.href} className="border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-[11px] text-[clamp(13px,3.7vw,15px)] font-bold ${
                          isActive(item.href) ? "text-[#ff7632]" : "text-[#373737]"
                        }`}
                      >
                        {t(navLabelKeys[item.href] || item.label)}
                      </Link>
                      {hasChildren ? (
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center text-[#373737]"
                          onClick={() => setMobileExpanded(expanded ? null : item.label)}
                          aria-expanded={expanded}
                          aria-label={`Toggle ${item.label}`}
                        >
                          <span
                            className={`text-lg leading-none transition-transform duration-300 ${
                              expanded ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                      ) : null}
                    </div>

                    <AnimatePresence initial={false}>
                      {hasChildren && expanded ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-4">
                            {item.label === PRODUCT_MENU_LABEL ? (
                              <>
                                {PRODUCT_CATEGORIES.map((category) => (
                                  <Link
                                    key={category.id}
                                    href={`/products?category=${category.id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-[clamp(12px,3.5vw,14px)] text-[#373737]"
                                  >
                                    {t(productCategoryLabelKeys[category.id])}
                                  </Link>
                                ))}
                                <div className="grid grid-cols-2 gap-3 py-3">
                                  {menuProducts.slice(0, 4).map((product) => (
                                    <Link
                                      key={product.id}
                                      href={`/products/${product.id}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-center"
                                    >
                                      <span className="relative mb-2 block aspect-square bg-white">
                                        <RemoteImage
                                          src={product.image}
                                          alt={product.name}
                                          fill
                                          sizes="140px"
                                          className="object-contain"
                                        />
                                      </span>
                                      <span className="line-clamp-2 text-[3.2vw] leading-snug text-[#373737]">
                                        {product.name}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              item.children?.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-2 text-[clamp(12px,3.5vw,14px)] text-[#373737]"
                                >
                                  {t(childLabelKeys[child.href] || child.label)}
                                </Link>
                              ))
                            )}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              {isAuthenticated ? (
                <div className="mt-4 flex items-center justify-between rounded bg-slate-50 p-3 text-sm">
                  <span className="truncate text-[#373737]">{user?.name}</span>
                  <div className="flex gap-3">
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-semibold text-[#0674fc]"
                      >
                        Admin
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="font-semibold text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
