"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * SolutionSection - Lösung section giống UNC Energy
 * Hiển thị các giải pháp năng lượng
 */
export default function SolutionSection() {
  const [activeSolution, setActiveSolution] = useState(0);
  const { t } = useLanguage();

  const solutions = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
      title: t("home.householdSolutionTitle"),
      description: t("home.householdSolutionDescription"),
      href: "/solutions/household",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a4 4 0 00-8 0v2"/>
          <line x1="12" y1="11" x2="12" y2="17"/>
          <line x1="9" y1="14" x2="15" y2="14"/>
        </svg>
      ),
      title: t("home.commercialSolutionTitle"),
      description: "",
      href: "/solutions/commercial",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M2 8h20M8 4v16"/>
          <circle cx="15" cy="14" r="2"/>
        </svg>
      ),
      title: t("home.photovoltaicSolutionTitle"),
      description: "",
      href: "/solutions/photovoltaic",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" id="solutions">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="section-title">{t("home.solutionsTitle")}</h2>
          <p className="section-subtitle">
            {t("home.solutionsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Solutions list */}
          <div>
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`solution-item ${activeSolution === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveSolution(index)}
              >
                <div className="solution-icon">
                  {solution.icon}
                </div>
                <div>
                  <h3 className={`solution-title ${activeSolution === index ? '!text-secondary' : ''}`}>
                    {solution.title}
                  </h3>
                  {solution.description && activeSolution === index && (
                    <>
                      <p className="solution-description mt-2">
                        {solution.description}
                      </p>
                      <Link href={solution.href} className="btn-orange mt-4 inline-block">
                        {t("common.more")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right - Illustration */}
          <div className="flex justify-center">
            <Image
              src="/solution-illustration.png"
              alt="Lösung - Energy Solutions"
              width={600}
              height={450}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
