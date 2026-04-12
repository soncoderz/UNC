import Link from "next/link";
import Badge from "@/components/common/Badge";
import { getCategoryLabel } from "@/utils/formatters";

/**
 * ProductCard - Hiển thị thông tin sản phẩm dạng card
 */
export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-light/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 bg-gradient-to-br from-light to-gray-light/30 flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
          {product.category === "pv-inverters" && "⚡"}
          {product.category === "energy-storage" && "🔋"}
          {product.category === "hybrid-inverters" && "🔄"}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && <Badge variant="new">NEW</Badge>}
          <Badge variant="primary">{getCategoryLabel(product.category)}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-lg text-dark group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-lg whitespace-nowrap">
            {product.power}
          </span>
        </div>

        <p className="text-gray text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Key Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="text-xs text-gray bg-light px-2 py-1 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group/link"
        >
          View Details
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
