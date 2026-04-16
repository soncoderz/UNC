"use client";

import { useState } from "react";
import type { Product } from "@/types/api";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: "",
      category: "pv-inverters",
      subcategory: "",
      power: "",
      description: "",
      image: "/products/default.jpg",
      isNew: false,
      isFeatured: false,
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-dark">
        {initialData ? "Edit Product" : "Add New Product"}
      </h3>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Name</label>
          <input
            type="text"
            required
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Category</label>
          <select
            name="category"
            required
            value={formData.category || "pv-inverters"}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="pv-inverters">PV Inverters</option>
            <option value="energy-storage">Energy Storage</option>
            <option value="hybrid-inverters">Hybrid Inverters</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Subcategory</label>
          <input
            type="text"
            required
            name="subcategory"
            value={formData.subcategory || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Power Range</label>
          <input
            type="text"
            required
            name="power"
            value={formData.power || ""}
            onChange={handleChange}
            placeholder="e.g. 5kW - 10kW"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Image URL</label>
          <input
            type="text"
            required
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">Description</label>
        <textarea
          required
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isNew"
            checked={!!formData.isNew}
            onChange={handleChange}
            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <span className="text-sm font-medium text-dark">Mark as New Product</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={!!formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <span className="text-sm font-medium text-dark">Feature on Homepage</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-[#e06612] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
