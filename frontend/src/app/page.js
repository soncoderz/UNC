import HeroSection from "@/components/home/HeroSection";
import SolutionSection from "@/components/home/SolutionSection";
import RndSection from "@/components/home/RndSection";
import NewsSection from "@/components/home/NewsSection";

/**
 * Trang chủ - Homepage UNC Energy
 * Bao gồm: Hero, Lösung, R&D, News
 * Footer (Contact Us Now) đã nằm trong layout
 */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionSection />
      <RndSection />
      <NewsSection />
    </>
  );
}
