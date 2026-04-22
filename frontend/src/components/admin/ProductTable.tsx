"use client";

import type { Product } from "@/types/api";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Power</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-dark">{product.name}</div>
                  <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{product.id}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {(product.gallery?.length || 0) + 1} image{product.gallery?.length ? "s" : ""}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.power}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {product.isNew && (
                      <span className="inline-flex px-2 py-0.5 text-[10px] font-bold rounded bg-orange-100 text-orange-600 uppercase tracking-wide">
                        New
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="inline-flex px-2 py-0.5 text-[10px] font-bold rounded bg-green-100 text-green-600 uppercase tracking-wide">
                        Star
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-primary hover:text-blue-700 font-medium text-sm mr-4 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                        onDelete(product.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    Delete
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
