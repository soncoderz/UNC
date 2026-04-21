"use client";

import { useState } from "react";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import type { Product } from "@/types/api";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  onUploadImage?: (fileDataUrl: string) => Promise<string>;
  onUploadImages?: (fileDataUrls: string[]) => Promise<string[]>;
}

const DEFAULT_PRODUCT_IMAGE = "/products/default.jpg";

const defaultProduct: Partial<Product> = {
  name: "",
  category: "pv-inverters",
  subcategory: "",
  power: "",
  description: "",
  features: [],
  specs: {},
  image: DEFAULT_PRODUCT_IMAGE,
  gallery: [],
  price: null,
  isNew: false,
  isFeatured: false,
};

function featuresToText(product?: Product) {
  return product?.features?.join("\n") || "";
}

function specsToText(product?: Product) {
  return Object.entries(product?.specs || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function imagesToText(images?: string[]) {
  return (images || []).join("\n");
}

function parseFeatures(text: string) {
  return text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSpecs(text: string) {
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.search(/[:=]/);

        if (separatorIndex === -1) {
          return [line, ""];
        }

        return [
          line.slice(0, separatorIndex).trim(),
          line.slice(separatorIndex + 1).trim(),
        ];
      })
      .filter(([key]) => Boolean(key))
  );
}

function parseImages(text: string) {
  return Array.from(
    new Set(
      text
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  onUploadImage,
  onUploadImages,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    { ...defaultProduct, ...initialData }
  );
  const [featuresText, setFeaturesText] = useState(featuresToText(initialData));
  const [specsText, setSpecsText] = useState(specsToText(initialData));
  const [galleryText, setGalleryText] = useState(imagesToText(initialData?.gallery));
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState<"main" | "gallery" | null>(null);
  const [error, setError] = useState("");
  const isUploading = uploadingTarget !== null;
  const galleryImages = parseImages(galleryText);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const uploadFiles = async (files: File[]) => {
    if (!files.length) {
      return [];
    }

    if (!onUploadImage && !onUploadImages) {
      setError("Image upload is not available.");
      return [];
    }

    if (files.some((file) => !file.type.startsWith("image/"))) {
      setError("Please select an image file.");
      return [];
    }

    const fileDataUrls = await Promise.all(files.map(readFileAsDataUrl));

    if (onUploadImages && fileDataUrls.length > 1) {
      return onUploadImages(fileDataUrls);
    }

    if (onUploadImage) {
      return Promise.all(fileDataUrls.map((fileDataUrl) => onUploadImage(fileDataUrl)));
    }

    const imageUrls = await onUploadImages?.(fileDataUrls);
    return imageUrls || [];
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setUploadingTarget("main");

    try {
      const [imageUrl] = await uploadFiles([file]);

      if (imageUrl) {
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploadingTarget(null);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) {
      return;
    }

    setError("");
    setUploadingTarget("gallery");

    try {
      const imageUrls = await uploadFiles(files);

      if (imageUrls.length) {
        const nextImages = Array.from(new Set([...galleryImages, ...imageUrls]));
        setGalleryText(imagesToText(nextImages));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images");
    } finally {
      setUploadingTarget(null);
      e.target.value = "";
    }
  };

  const removeGalleryImage = (imageUrl: string) => {
    setGalleryText(imagesToText(galleryImages.filter((image) => image !== imageUrl)));
  };

  const setGalleryImageAsMain = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
    removeGalleryImage(imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await onSubmit({
        ...formData,
        features: parseFeatures(featuresText),
        specs: parseSpecs(specsText),
        image: formData.image || DEFAULT_PRODUCT_IMAGE,
        gallery: parseImages(galleryText).filter((image) => image !== formData.image),
        price: formData.price ?? null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
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

        <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Main image URL</label>
            <input
              type="text"
              required
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
            <div className="mt-3">
              <label className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-dark text-sm font-medium rounded-lg cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="sr-only"
                />
                {uploadingTarget === "main" ? "Uploading..." : "Upload main image"}
              </label>
            </div>
          </div>

          <div className="relative h-36 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
            {formData.image ? (
              <RemoteImage
                src={formData.image}
                alt=""
                fill
                sizes="180px"
                className="object-contain p-2"
              />
            ) : null}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
            <label className="block text-sm font-medium text-dark">
              Additional detail images
            </label>
            <label className="inline-flex w-fit items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-dark text-sm font-medium rounded-lg cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                disabled={isUploading}
                className="sr-only"
              />
              {uploadingTarget === "gallery" ? "Uploading..." : "Upload additional images"}
            </label>
          </div>

          <textarea
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
            rows={4}
            placeholder="One image URL per line"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-y"
          />

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {galleryImages.length > 0 ? (
              galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative h-28 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden group"
                >
                  <RemoteImage
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 180px"
                    className="object-contain p-2"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex bg-white/90 text-[11px] font-medium opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setGalleryImageAsMain(image)}
                      className="flex-1 px-2 py-1 text-primary hover:bg-blue-50"
                    >
                      Main
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(image)}
                      className="flex-1 px-2 py-1 text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                No additional images.
              </div>
            )}
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Features
          </label>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={5}
            placeholder="One feature per line"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Specifications
          </label>
          <textarea
            value={specsText}
            onChange={(e) => setSpecsText(e.target.value)}
            rows={5}
            placeholder="Power: 10kW"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-y"
          />
        </div>
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
          disabled={isLoading || isUploading}
          className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isUploading}
          className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-[#e06612] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
