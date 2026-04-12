import ProductSpecs from "@/components/products/ProductSpecs";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { getCategoryLabel } from "@/utils/formatters";

/**
 * Product Detail Page - Server Component
 */

async function getProduct(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product?.name || "Product Details",
    description: product?.description || "Product details page",
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-dark mb-4">
            Product Not Found
          </h1>
          <Button href="/products" variant="primary">
            Back to Products
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button href="/products" variant="ghost" className="text-white/70 hover:text-white mb-4">
            ← Back to Products
          </Button>
        </div>
      </section>

      {/* Product Content */}
      <section className="pb-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left - Image */}
            <div className="bg-white rounded-2xl border border-gray-light/50 p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-4 opacity-40">
                  {product.category === "pv-inverters" && "⚡"}
                  {product.category === "energy-storage" && "🔋"}
                  {product.category === "hybrid-inverters" && "🔄"}
                </div>
                <p className="text-sm text-gray">Product Image</p>
              </div>
            </div>

            {/* Right - Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isNew && <Badge variant="new">NEW</Badge>}
                <Badge variant="primary">
                  {getCategoryLabel(product.category)}
                </Badge>
                <Badge variant="default">{product.power}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-gray text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-lg text-dark mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <span className="text-dark-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Request a Quote
                </Button>
                <Button href="/support" variant="outline" size="lg">
                  Download Datasheet
                </Button>
              </div>
            </div>
          </div>

          {/* Specs Table */}
          <div className="mt-12">
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </section>
    </>
  );
}
