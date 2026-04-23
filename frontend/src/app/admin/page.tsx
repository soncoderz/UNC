"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/services/api";
import type { Product } from "@/types/api";
import ProductTable from "@/components/admin/ProductTable";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminDashboard() {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.getProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreateForm = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  const handleFormSubmit = async (data: Partial<Product>) => {
    if (!token) throw new Error("No token found");

    if (editingProduct) {
      // Update
      await api.updateProductAdmin(token, editingProduct.id, data);
    } else {
      // Create
      await api.createProductAdmin(token, data);
    }

    await fetchProducts();
    handleCloseForm();
  };

  const handleImageUpload = async (fileDataUrl: string) => {
    if (!token) throw new Error("No token found");

    const response = await api.uploadImageAdmin(token, fileDataUrl);
    return response.data.url;
  };

  const handleImagesUpload = async (fileDataUrls: string[]) => {
    if (!token) throw new Error("No token found");

    const response = await api.uploadImagesAdmin(token, fileDataUrls);
    return response.data.map((item) => item.url);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await api.deleteProductAdmin(token, id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert(t("admin.deleteFailed"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">{t("admin.productsManagement")}</h1>
          <p className="text-gray-500 mt-1">{t("admin.manageCatalog")}</p>
        </div>
        
        {!isFormOpen && (
          <button
            onClick={handleOpenCreateForm}
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-[#e06612] transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span> {t("admin.addProduct")}
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ProductForm 
            initialData={editingProduct} 
            onSubmit={handleFormSubmit}
            onCancel={handleCloseForm}
            onUploadImage={handleImageUpload}
            onUploadImages={handleImagesUpload}
          />
        </div>
      ) : isLoading ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">{t("admin.loadingProducts")}</p>
        </div>
      ) : (
        <ProductTable 
          products={products} 
          onEdit={handleOpenEditForm}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
