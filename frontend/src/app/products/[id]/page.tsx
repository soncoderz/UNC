"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneProducts } from "@/data/uniconvtor";
import { getProductById } from "@/services/api";
import type { Product } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";
import { formatSpecLabel } from "@/utils/formatters";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(
    cloneProducts.find((item) => item.id === params.id) || null
  );
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchProduct() {
      const fallback = cloneProducts.find((item) => item.id === params.id) || null;

      try {
        setLoading(true);
        const response = await getProductById(params.id);
        const apiProduct = response.data || null;
        setProduct(
          apiProduct?.image.startsWith("/static/upload/") ? apiProduct : fallback
        );
      } catch {
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    }

    void fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <p className="text-gray">{t("products.loading")}</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-dark mb-4">
            {t("products.detailNotFound")}
          </h1>
          <Link href="/products" className="inline-block px-8 py-3 bg-[#1ea1f2] text-white rounded-full font-medium">
            {t("products.backToProducts")}
          </Link>
        </div>
      </section>
    );
  }

  const subCategories = product.subcategory.split(" | ");

  return (
    <div className="product-layout-wrapper bg-[#ffffff]">
      {/* 1. Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-r from-[#0a1128] via-[#101b33] to-[#0a1128] flex items-center pt-24 text-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -left-40 top-0 w-[800px] h-full bg-gradient-to-r from-orange-500/20 to-transparent transform -skew-x-[30deg]"></div>
           <div className="absolute -left-20 top-0 w-[400px] h-full bg-gradient-to-r from-orange-500/10 to-transparent transform -skew-x-[30deg]"></div>
        </div>
        
        <div className="max-w-[1400px] w-[min(calc(100%-40px),1400px)] mx-auto relative z-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-[42px] font-bold leading-tight mb-8 font-heading">{product.name}</h1>
            <div className="w-[300px] h-[2px] bg-orange-500 mb-8"></div>
            
            <div className="flex items-center gap-4 mb-12">
               <div className="w-10 h-10 border border-[#1ea1f2] rounded flex items-center justify-center flex-shrink-0 text-[#1ea1f2]">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 19H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V9h2v2zm0-4H7V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z"/></svg>
               </div>
               <div className="text-[15px] leading-snug">
                 {subCategories.map((sub, i) => (
                   <p key={i}>{sub}</p>
                 ))}
               </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-20">
               <button className="bg-[#1ea1f2] hover:bg-[#1a8cd2] text-white rounded-full px-8 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  {t("products.parameter")}
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V3M7 11L3.5 7.5M7 11L10.5 7.5"/><path d="M2.33331 13.5H11.6666"/></svg>
               </button>
               <button className="border border-white/40 hover:border-white/80 text-white/90 hover:text-white rounded-[24px] px-8 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  {t("products.manual")}
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V3M7 11L3.5 7.5M7 11L10.5 7.5"/><path d="M2.33331 13.5H11.6666"/></svg>
               </button>
            </div>

            <div className="text-[12px] text-gray-400 flex items-center gap-2 absolute bottom-0">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               <span>{t("products.positionPrefix")}{product.subcategory.replace(' | ', ' > ')}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-end h-[420px]">
             <div className="flex-1 max-w-[500px] h-full bg-gradient-to-b from-white/20 to-white/5 rounded-lg flex items-center justify-center backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(30,161,242,0.15)] relative">
               <RemoteImage src={product.image} alt={product.name} width={400} height={300} className="object-contain drop-shadow-2xl" />
             </div>
             <div className="w-[80px] h-full flex flex-col justify-between">
                <button className="bg-white/10 hover:bg-white/20 h-10 rounded shrink-0 flex items-center justify-center transition-colors">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7L7 1L1 7"/></svg>
                </button>
                <div className="flex-1 my-3 flex flex-col gap-3 overflow-hidden justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-full h-20 bg-white/10 rounded flex items-center justify-center p-2 cursor-default ${i===0 ? 'ring-2 ring-[#1ea1f2]' : 'opacity-60'} transition-all`}>
                      <RemoteImage src={product.image} alt="thumb" width={60} height={40} className="object-contain" />
                    </div>
                  ))}
                </div>
                <button className="bg-white/10 hover:bg-white/20 h-10 rounded shrink-0 flex items-center justify-center transition-colors">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L7 7L13 1"/></svg>
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Product Advantages */}
      {product.features && product.features.length > 0 && (
      <section className="py-24 max-w-[1200px] mx-auto px-4">
        <h2 className="text-[32px] font-bold text-center text-[#2d3748] mb-20 font-heading">{t("products.productAdvantages")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
           {product.features.map((feature, i) => {
             let title = feature;
             let desc = "";
             if (feature.includes(":")) {
               const parts = feature.split(":");
               title = parts[0];
               desc = parts[1];
             } else {
                const words = feature.split(" ");
                title = words.slice(0, 2).join(" ");
                desc = feature;
             }

             return (
               <div key={i} className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#6eb6ff] to-[#3a9cff] rounded-3xl flex items-center justify-center text-white mb-6 transform group-hover:-translate-y-2 transition-transform shadow-lg shadow-blue-500/20 relative">
                     <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-3xl"></div>
                     <svg className="w-8 h-8 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#1e293b] mb-3">{title}</h3>
                  <p className="text-[#64748b] text-[14px] leading-relaxed max-w-[280px]">{desc}</p>
                  <div className="w-6 h-0.5 bg-orange-500 mt-5 transition-all group-hover:w-10"></div>
               </div>
             );
           })}
        </div>
      </section>
      )}

      {/* 3. Technical Specifications */}
      {product.specs && Object.keys(product.specs).length > 0 && (
      <section className="py-16 max-w-[1200px] mx-auto px-4">
        <h2 className="text-[32px] font-bold text-center text-[#2d3748] mb-12 font-heading">{t("products.technicalSpecifications")}</h2>
        
        <div className="w-full text-[14px]">
           <div className="grid grid-cols-2 bg-[#f1f5f9] py-4 px-6 font-medium mb-[1px]">
              <div className="text-[#64748b]">{t("products.productModel")}</div>
              <div className="text-center text-[#334155]">{product.power}</div>
           </div>
           
           <div className="bg-white py-4 px-6 font-medium text-[#2563eb] mb-[1px]">
              {t("products.specificationsData")}
           </div>
           
           {Object.entries(product.specs).map(([key, value], i) => (
           <div key={key} className={`grid grid-cols-2 py-4 px-6 ${i % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'} border-b border-gray-100 last:border-0`}>
              <div className="text-[#64748b]">{formatSpecLabel(key)}</div>
              <div className="text-center text-[#334155]">{value}</div>
           </div>
           ))}
        </div>
      </section>
      )}

      {/* 4. Recommended Products */}
      <section className="py-24 bg-[#f8fafc]">
         <div className="max-w-[1400px] w-[min(calc(100%-40px),1400px)] mx-auto">
            <h2 className="text-[32px] font-bold text-center text-[#2d3748] mb-16 font-heading">{t("products.recommendedProducts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {cloneProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(p => (
                  <div key={p.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full border border-gray-100 group px-6 py-8">
                     <Link href={`/products/${p.id}`} className="block h-[240px] w-full bg-white relative flex justify-center items-center mb-6">
                        <RemoteImage src={p.image} alt={p.name} width={220} height={220} className="object-contain group-hover:scale-105 transition-transform" />
                     </Link>
                     <div className="flex flex-col flex-1">
                        <h3 className="font-bold text-[18px] text-[#1e293b] leading-tight mb-3 line-clamp-2">{p.name}</h3>
                        <p className="text-[#60a5fa] text-[13px] mb-6">{p.subcategory.split(' | ').join(' | ')}</p>
                        
                        <p className="text-[#94a3b8] text-[12px] leading-relaxed line-clamp-3 mt-auto mb-8">{p.description}</p>
                        
                        <Link href={`/products/${p.id}`} className="inline-flex items-center justify-center bg-[#60a5fa] hover:bg-[#3b82f6] text-white text-[12px] font-bold tracking-wider rounded-full px-8 py-3 transition-colors max-w-max shadow-md shadow-blue-500/20">
                           {t("products.more")}
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}

