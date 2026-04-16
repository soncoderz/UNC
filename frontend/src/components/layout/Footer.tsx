"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
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

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="clone-footer">
      <section className="contact-section py-16">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {t("footer.contactNow")}
              </h2>
              <p className="text-white/70 text-sm">{COMPANY_INFO.slogan}</p>
            </div>
            <form className="flex flex-col sm:flex-row items-stretch gap-0 bg-white overflow-hidden shadow-lg w-full lg:w-auto">
              <input
                type="text"
                placeholder={t("footer.name")}
                className="contact-form-input border-r-0 rounded-none"
              />
              <input
                type="tel"
                placeholder={t("footer.telephone")}
                className="contact-form-input border-r-0 rounded-none"
              />
              <input
                type="text"
                placeholder={t("footer.counseling")}
                className="contact-form-input rounded-none"
              />
              <button className="contact-form-btn rounded-none" type="button">
                {t("footer.sending")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="clone-footer-top">
        <div>
          <RemoteImage src="/template/default/esimg/icon/foot1.png" alt="" width={42} height={42} />
          <span>
            <em>{t("contact.address")}</em>
            <strong>{COMPANY_INFO.address}</strong>
          </span>
        </div>
        <div>
          <RemoteImage src="/template/default/esimg/icon/foot2.png" alt="" width={42} height={42} />
          <span>
            <em>{t("footer.hotline")}</em>
            <strong>{COMPANY_INFO.phone}</strong>
          </span>
        </div>
        <div>
          <RemoteImage src="/template/default/esimg/icon/foot3.png" alt="" width={42} height={42} />
          <span>
            <em>{t("contact.email")}</em>
            <strong>{COMPANY_INFO.email}</strong>
          </span>
        </div>
        <Link href="/" className="clone-footer-arrow" aria-label="Back to home">
          <RemoteImage src="/template/default/esimg/icon/foot4.png" alt="" width={38} height={38} />
        </Link>
      </div>

      <div className="clone-footer-main">
        <div className="clone-footer-links">
          {Object.entries(FOOTER_LINKS).map(([key, group]) => (
            <div key={key}>
              <Link href={group.links[0]?.href || "/"} className="clone-footer-title">
                {t(footerTitleKeys[key] || group.title)}
              </Link>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {t(footerLinkKeys[link.href] || link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <Link href="/contact" className="clone-footer-title">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
        <div className="clone-footer-qr">
          <RemoteImage
            src="/static/upload/image/20240827/1724725433746661.jpg"
            alt="UNC QR code"
            width={116}
            height={116}
          />
        </div>
      </div>

      <div className="clone-footer-bottom">
        <span>PV Inverter | Solar Inverter | Off Grid Inverter | Solar Energy Company</span>
        <span>Developers: Eshine</span>
      </div>
    </footer>
  );
}
