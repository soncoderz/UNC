"use client";

import type { Product } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const { t } = useLanguage();

  const categoryLabel = (slug: string) => {
    const map: Record<string, string> = {
      "pv-inverters": t("admin.pvInverters"),
      "energy-storage": t("admin.energyStorage"),
      "hybrid-inverters": t("admin.hybridInverters"),
    };
    return map[slug] || slug;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-500">{t("admin.noProducts")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("admin.colProduct")}</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("admin.colCategory")}</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("admin.colPower")}</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("admin.colTags")}</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">{t("admin.colActions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-dark">{product.name}</div>
                  <div className="text-xs text-gray-500 mt-1 truncate max-w-50">{product.id}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {(product.gallery?.length || 0) + 1} {product.gallery?.length ? t("admin.images") : t("admin.image")}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700">
                    {categoryLabel(product.category)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.power}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {product.isNew && (
                      <span className="inline-flex px-2 py-0.5 text-[10px] font-bold rounded bg-orange-100 text-orange-600 uppercase tracking-wide">
                        {t("admin.tagNew")}
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="inline-flex px-2 py-0.5 text-[10px] font-bold rounded bg-green-100 text-green-600 uppercase tracking-wide">
                        {t("admin.tagStar")}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-primary hover:text-blue-700 font-medium text-sm mr-4 transition-colors"
                  >
                    {t("admin.edit")}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`${t("admin.confirmDelete")} ${product.name}?`)) {
                        onDelete(product.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    {t("admin.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
