import { formatSpecLabel } from "@/utils/formatters";

/**
 * ProductSpecs - Bảng thông số kỹ thuật sản phẩm
 */
export default function ProductSpecs({ specs }) {
  if (!specs) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-light/50 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-primary to-primary-light">
        <h3 className="font-heading font-bold text-lg text-white">
          Technical Specifications
        </h3>
      </div>
      <div className="divide-y divide-gray-light/50">
        {Object.entries(specs).map(([key, value], index) => (
          <div
            key={key}
            className={`flex items-center justify-between px-6 py-3.5 ${
              index % 2 === 0 ? "bg-white" : "bg-light/50"
            } hover:bg-primary/5 transition-colors`}
          >
            <span className="text-sm font-medium text-gray">
              {formatSpecLabel(key)}
            </span>
            <span className="text-sm font-semibold text-dark text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
