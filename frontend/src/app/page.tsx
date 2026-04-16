import { redirect } from "next/navigation";
import HeroSection from "@/components/home/HeroSection";
import SolutionSection from "@/components/home/SolutionSection";
import RecommendedProducts from "@/components/home/RecommendedProducts";
import RndSection from "@/components/home/RndSection";
import NewsSection from "@/components/home/NewsSection";

/**
 * Trang chủ - Homepage UNC Energy
 * Bao gồm: Hero, Lösung, R&D, News
 * Footer (Contact Us Now) đã nằm trong layout
 */

const legacyRoutes: Record<string, string> = {
  "aboutus/": "/company",
  "develop/": "/company#milestone",
  "honor/": "/company#honor",
  "company/": "/news",
  "cases/": "/solutions",
  "cases": "/solutions",
  "cases/case_huyong.html": "/solutions/household",
  "cases/case_gongshangye.html": "/solutions/commercial",
  "cases/case_guangfu.html": "/solutions/photovoltaic",
  "product/": "/products",
  "research/": "/rnd",
  "research": "/rnd",
  "service/": "/support",
  "material/": "/support#download",
  "contact/": "/contact",
  "list_29/158.html": "/products/single-phase-hybrid-3-6kw",
  "list_29/163.html": "/products/three-phase-hybrid-8-12kw",
  "list_29/164.html": "/products/three-phase-hybrid-15-20kw",
  "list_29/161.html": "/products/single-phase-hybrid-off-grid-4-10kw",
  "list_29/517.html": "/products/single-phase-hybrid-low-voltage-10-12kw",
  "list_30/156.html": "/products/pv-battery-all-in-one",
  "list_33/152.html": "/products/ci-energy-storage-module",
  "list_32/151.html": "/products/ci-energy-storage-converter",
  "list_37/80.html": "/products/three-phase-pv-10-25kw",
  "list_38/133.html": "/products/three-phase-pv-25-50kw",
  "list_38/134.html": "/products/three-phase-pv-80-110kw",
};

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {};
  const legacyKey = Object.keys(params)[0];

  if (legacyKey && legacyRoutes[legacyKey]) {
    redirect(legacyRoutes[legacyKey]);
  }

  return (
    <>
      <HeroSection />
      <SolutionSection />
      <RecommendedProducts />
      <RndSection />
      <NewsSection />
    </>
  );
}
