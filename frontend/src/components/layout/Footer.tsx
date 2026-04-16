"use client";

import Link from "next/link";
import { COMPANY_INFO, FOOTER_LINKS } from "@/constants/navigation";
import { useLanguage } from "@/context/LanguageContext";

const footerTitleKeys: Record<string, string> = {
  aboutUs: "nav.aboutUs",
  losung: "nav.solutions",
  products: "nav.productsCenter",
  rnd: "nav.rnd",
  support: "nav.technicalSupport",
};

const footerLinkKeys: Record<string, string> = {
  "/company#hitu": "nav.aboutUs",
  "/company#honor": "company.certificationsTitle",
  "/company#intro": "company.storyTitle",
  "/news": "news.title",
  "/solutions/household": "nav.solutionHousehold",
  "/solutions/commercial": "nav.solutionCommercial",
  "/solutions/photovoltaic": "nav.solutionPhotovoltaic",
  "/products?category=pv-inverters": "products.pvInverters",
  "/products?category=energy-storage": "products.energyStorage",
  "/products?category=hybrid-inverters": "products.hybridInverters",
  "/rnd#capacidades": "nav.rndCapabilities",
  "/rnd#produccion": "nav.batchProduction",
  "/rnd#calidad": "nav.qualityAssurance",
  "/support#technical": "nav.technicalSupport",
  "/support#postventa": "nav.postSale",
  "/support#download": "nav.dataDownload",
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      {/* Contact Us Now Section */}
      <section className="contact-section py-16">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {t("footer.contactNow")}
              </h2>
              <p className="text-white/70 text-sm">{COMPANY_INFO.slogan}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-0 bg-white rounded-lg overflow-hidden shadow-lg w-full lg:w-auto">
              <input
                type="text"
                placeholder={t("footer.name")}
                className="contact-form-input border-r-0 rounded-none"
                id="contact-name"
              />
              <input
                type="tel"
                placeholder={t("footer.telephone")}
                className="contact-form-input border-r-0 rounded-none"
                id="contact-phone"
              />
              <input
                type="text"
                placeholder={t("footer.counseling")}
                className="contact-form-input rounded-none"
                id="contact-message"
              />
              <button className="contact-form-btn rounded-none lg:rounded-r-lg" id="contact-submit">
                {t("footer.sending")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="contact-info-bar">
            {/* Address */}
            <div className="contact-info-item">
              <div className="contact-info-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <div className="contact-info-label">{t("contact.address")}</div>
                <div className="contact-info-value">{COMPANY_INFO.address}</div>
              </div>
            </div>

            {/* Hotline */}
            <div className="contact-info-item">
              <div className="contact-info-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <div className="contact-info-label">{t("footer.hotline")}</div>
                <div className="contact-info-value">{COMPANY_INFO.phone}</div>
              </div>
            </div>

            {/* Email */}
            <div className="contact-info-item">
              <div className="contact-info-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <div className="contact-info-label">{t("contact.email")}</div>
                <div className="contact-info-value">{COMPANY_INFO.email}</div>
              </div>
            </div>

            {/* Arrow icon */}
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-section">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-grid">
            {/* About Us */}
            <div>
              <h4 className="footer-col-title">{t(footerTitleKeys.aboutUs)}</h4>
              <ul className="footer-col-links">
                {FOOTER_LINKS.aboutUs.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{t(footerLinkKeys[link.href] || link.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lösung */}
            <div>
              <h4 className="footer-col-title">{t(footerTitleKeys.losung)}</h4>
              <ul className="footer-col-links">
                {FOOTER_LINKS.losung.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{t(footerLinkKeys[link.href] || link.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Centro de productos */}
            <div>
              <h4 className="footer-col-title">{t(footerTitleKeys.products)}</h4>
              <ul className="footer-col-links">
                {FOOTER_LINKS.products.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{t(footerLinkKeys[link.href] || link.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* R&D and Manufacturing */}
            <div>
              <h4 className="footer-col-title">{t(footerTitleKeys.rnd)}</h4>
              <ul className="footer-col-links">
                {FOOTER_LINKS.rnd.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{t(footerLinkKeys[link.href] || link.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apoyo técnico */}
            <div>
              <h4 className="footer-col-title">{t(footerTitleKeys.support)}</h4>
              <ul className="footer-col-links">
                {FOOTER_LINKS.support.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{t(footerLinkKeys[link.href] || link.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="footer-col-title">{t("nav.contact")}</h4>
            </div>

            {/* QR Code */}
            <div className="flex items-start justify-center">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white"/>
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="#333"/>
                  <rect x="60" y="10" width="30" height="30" rx="4" fill="#333"/>
                  <rect x="10" y="60" width="30" height="30" rx="4" fill="#333"/>
                  <rect x="15" y="15" width="20" height="20" rx="2" fill="white"/>
                  <rect x="65" y="15" width="20" height="20" rx="2" fill="white"/>
                  <rect x="15" y="65" width="20" height="20" rx="2" fill="white"/>
                  <rect x="20" y="20" width="10" height="10" fill="#333"/>
                  <rect x="70" y="20" width="10" height="10" fill="#333"/>
                  <rect x="20" y="70" width="10" height="10" fill="#333"/>
                  <rect x="50" y="50" width="8" height="8" fill="#333"/>
                  <rect x="60" y="60" width="8" height="8" fill="#333"/>
                  <rect x="70" y="70" width="8" height="8" fill="#333"/>
                  <rect x="80" y="60" width="8" height="8" fill="#333"/>
                  <rect x="60" y="80" width="8" height="8" fill="#333"/>
                  <rect x="80" y="80" width="8" height="8" fill="#333"/>
                  <rect x="50" y="70" width="8" height="8" fill="#333"/>
                  <rect x="70" y="50" width="8" height="8" fill="#333"/>
                  <rect x="45" y="10" width="5" height="5" fill="#333"/>
                  <rect x="45" y="20" width="5" height="5" fill="#333"/>
                  <rect x="45" y="30" width="5" height="5" fill="#333"/>
                  <rect x="10" y="45" width="5" height="5" fill="#333"/>
                  <rect x="20" y="45" width="5" height="5" fill="#333"/>
                  <rect x="30" y="45" width="5" height="5" fill="#333"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
