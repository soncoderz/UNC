"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * RndSection - R&D and Manufacturing section giống UNC Energy
 * Hiển thị chứng chỉ và thống kê
 */
export default function RndSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a6fef">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      number: "10",
      suffix: "+",
      label: "en el sector energético y de energía.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a6fef">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"/>
        </svg>
      ),
      number: "40",
      suffix: "+",
      label: "anual supera las 400.000 unidades",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a6fef">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      number: "30",
      suffix: "+",
      label: "de 30 países en todo el mundo.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a6fef">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      ),
      number: "10000",
      suffix: "+",
      label: "de 10.000 metros cuadrados",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a6fef">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
        </svg>
      ),
      number: "10",
      suffix: "+",
      label: "más de 10.000 metros cuadrados",
    },
  ];

  return (
    <section className="rnd-section py-20 lg:py-28" id="rnd">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left content */}
          <div>
            <h2 className="text-3xl font-bold text-dark mb-3">
              {t("home.rndTitle")}
            </h2>
            <p className="text-sm text-gray mb-8">
              {t("home.rndSubtitle")}
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-gray leading-relaxed">
                {t("home.rndParagraph1")}
              </p>
              <p className="text-sm text-gray leading-relaxed">
                {t("home.rndParagraph2")}
              </p>
              <p className="text-sm text-gray leading-relaxed">
                {t("home.rndParagraph3")}
              </p>
            </div>

            <Link href="/rnd" className="btn-orange">
              {t("common.more")}
            </Link>
          </div>

          {/* Right - Certificates image */}
          <div className="flex justify-center">
            <Image
              src="/certificates.png"
              alt="R&D Certificates"
              width={550}
              height={380}
              className="object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-number">
                {stat.number}<sup>{stat.suffix}</sup>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
