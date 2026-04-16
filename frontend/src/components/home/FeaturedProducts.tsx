import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/common/Button";
import type { Product } from "@/types/api";

interface FeaturedProductsProps {
  products?: Product[];
}

/**
 * FeaturedProducts - Sản phẩm nổi bật trên trang chủ
 */
export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  return (
    <section className="py-20 lg:py-28 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Discover our latest innovations in solar inverters and energy storage
            systems designed for maximum performance and reliability.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray">Loading products...</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Button href="/products" variant="primary" size="lg">
            View All Products
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
