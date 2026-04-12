import HeroSection from "@/components/home/HeroSection";
import CompanyIntro from "@/components/home/CompanyIntro";
import FeaturedProducts from "@/components/home/FeaturedProducts";

/**
 * Trang chủ - Homepage
 * Server component: Fetch dữ liệu ở server side
 */

async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products?featured=true`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <CompanyIntro />
      <FeaturedProducts products={featuredProducts} />
    </>
  );
}
