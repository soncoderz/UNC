"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BigMessageForm from "@/components/uniconvtor/BigMessageForm";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneProducts } from "@/data/uniconvtor";
import { getProductById, getProducts } from "@/services/api";
import type { Product, ProductCategory } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";
import { formatSpecLabel } from "@/utils/formatters";

type ProductAdvantage = {
  title: string;
  text: string;
  icon: string;
};

type ProductSpecRow = {
  label: string;
  values?: string[];
  isSection?: boolean;
};

type ProductSpecTable = {
  headers: string[];
  rows: ProductSpecRow[];
};

type ProductDetailAsset = {
  gallery?: string[];
  parameterUrl?: string;
  manualUrl?: string;
  advantages?: ProductAdvantage[];
  specsTable?: ProductSpecTable;
};

const PRODUCT_DETAIL_HERO = "/static/upload/image/20240716/1721115755367003.png";
const DEFAULT_PARAMETER_URL =
  "http://www.uniconvtor.com/static/upload/file/20240822/1724318298189989.pdf";
const DEFAULT_MANUAL_URL =
  "http://www.uniconvtor.com/static/upload/file/20240801/1722474859398530.pdf";

const categoryIcons: Record<ProductCategory, string> = {
  "hybrid-inverters": "/static/upload/image/20240716/1721118202320162.png",
  "energy-storage": "/static/upload/image/20240717/1721188274813707.png",
  "pv-inverters": "/static/upload/image/20240717/1721188409100664.png",
};

const advantageIcons = [
  "/static/upload/image/20240716/1721114843103789.png",
  "/static/upload/image/20240724/1721812008153581.png",
  "/static/upload/image/20240724/1721812017355155.png",
  "/static/upload/image/20240724/1721810441436982.png",
  "/static/upload/image/20240724/1721812039157822.png",
];

const productDetailAssets: Record<string, ProductDetailAsset> = {
  "single-phase-hybrid-3-6kw": {
    gallery: [
      "/static/upload/image/20240722/1721618011773443.png",
      "/static/upload/image/20240722/1721618014955956.png",
      "/static/upload/image/20240722/1721618016331088.png",
    ],
  },
  "three-phase-hybrid-8-12kw": {
    gallery: [
      "/static/upload/image/20240722/1721630499957128.png",
      "/static/upload/image/20240722/1721630502781303.png",
      "/static/upload/image/20240722/1721630505702525.png",
      "/static/upload/image/20240722/1721630507725059.png",
    ],
    parameterUrl: DEFAULT_PARAMETER_URL,
    manualUrl: DEFAULT_MANUAL_URL,
    advantages: [
      {
        title: "10ms",
        text: "UPS level automatic switching under 10ms.",
        icon: "/static/upload/image/20240716/1721114843103789.png",
      },
      {
        title: "Flexible schedule",
        text: "Flexible schedule for inverter charging and discharging time.",
        icon: "/static/upload/image/20240724/1721812008153581.png",
      },
      {
        title: "Three-phase imbalance",
        text: "Support three-phase imbalance on backup output port.",
        icon: "/static/upload/image/20240724/1721812017355155.png",
      },
      {
        title: "IP66",
        text: "Degree of protection: IP66.",
        icon: "/static/upload/image/20240724/1721810441436982.png",
      },
      {
        title: "26A",
        text: "2 MPPT and 4 DC input; max 26A DC input current.",
        icon: "/static/upload/image/20240724/1721812039157822.png",
      },
    ],
    specsTable: {
      headers: [
        "Product Model",
        "ESS1-8K3P-02-HV",
        "ESS1-10K3P-02-HV",
        "ESS1-12K3P-02-HV",
      ],
      rows: [
        { label: "PV String Input Data", isSection: true },
        { label: "Recommended Max. PV Power", values: ["12kW", "15kW", "18kW"] },
        { label: "Max. Input Voltage", values: ["1000V"] },
        { label: "Rated Input Voltage", values: ["600V"] },
        { label: "Start-up Voltage", values: ["200V"] },
        { label: "MPPT Voltage Range", values: ["200-850V"] },
        { label: "Max. Input Current", values: ["26A/26A"] },
        { label: "Max. Short-Circuit Current", values: ["39A/39A"] },
        { label: "MPPT Number / String Number per MPPT", values: ["2/4"] },
        { label: "Battery Data", isSection: true },
        { label: "Battery Type", values: ["Li-ion"] },
        { label: "Battery Voltage Range", values: ["180-600V"] },
        { label: "Max. Charging/Discharging Power", values: ["8kW", "10kW", "10kW"] },
        { label: "Max. Charging/Discharging Current", values: ["30A"] },
        { label: "Communications", values: ["RS485/CAN"] },
        { label: "AC Output Data", isSection: true },
        { label: "Rated Output Power", values: ["8kW", "10kW", "12kW"] },
        { label: "Max. Output Power", values: ["8.8kW", "11kW", "13.2kW"] },
        { label: "Max. Apparent Output Power", values: ["8.8kVA", "11kVA", "13.2kVA"] },
        { label: "Rated Output Current", values: ["12.1A", "15.2A", "18.2A"] },
        { label: "Max. Output Current", values: ["13.4A", "16.7A", "20A"] },
        { label: "Switching Time", values: ["<10ms"] },
        { label: "Rated Output Voltage/Frequency", values: ["3L/N/PE 380V/400V 50Hz/60Hz"] },
        { label: "Power Factor", values: ["0.8 leading ~0.8 lagging"] },
        { label: "THDv (@Linear load)", values: ["<3%"] },
        { label: "THDi", values: ["<2%"] },
        { label: "AC Input Data", isSection: true },
        { label: "Max. Apparent Input Power", values: ["8.8kVA", "11kVA", "13.2kVA"] },
        { label: "Max. Input Current", values: ["13.4A", "16.7A", "20A"] },
        { label: "Rated Input Voltage/Frequency", values: ["3L/N/PE 380V/400V 50Hz/60Hz"] },
        { label: "Efficiency", isSection: true },
        { label: "Max. Efficiency", values: ["98.10%"] },
        { label: "Euro Efficiency", values: ["97%"] },
        { label: "Standards", isSection: true },
        { label: "Safety", values: ["IEC62109-1/-2"] },
        { label: "EMC", values: ["EN61000-6-1/EN61000-6-3"] },
        { label: "General Data", isSection: true },
        { label: "Dimensions (W*H*D)", values: ["556mm x 482mm x 196mm"] },
        { label: "Cooling Concept", values: ["Natural"] },
        { label: "Weight", values: ["27.5kg"] },
        { label: "Ingress Protection", values: ["IP66"] },
        { label: "Operating Ambient Temperature", values: ["-25~60C (>45 derating)"] },
        { label: "Max. Operation Altitude", values: ["3000m"] },
        { label: "Communications", values: ["RS485/WIFI/GPRS/LAN"] },
      ],
    },
  },
  "three-phase-hybrid-15-20kw": {
    gallery: [
      "/static/upload/image/20240722/1721632850345517.png",
      "/static/upload/image/20240722/1721632853943364.png",
      "/static/upload/image/20240722/1721632857966124.png",
    ],
  },
  "single-phase-hybrid-off-grid-4-10kw": {
    gallery: [
      "/static/upload/image/20250219/1739945044275583.png",
      "/static/upload/image/20250219/1739945178523119.png",
      "/static/upload/image/20250219/1739945037984895.png",
    ],
  },
  "single-phase-hybrid-low-voltage-10-12kw": {
    gallery: [
      "/static/upload/image/20260330/1774859137668030.png",
      "/static/upload/image/20260330/1774859132153475.png",
    ],
  },
  "single-phase-hybrid-low-voltage-4-8-6-6kw": {
    gallery: [
      "/static/upload/image/20260401/1775023285865256.png",
      "/static/upload/image/20260401/1775023282222564.png",
    ],
  },
  "pv-battery-all-in-one": {
    gallery: [
      "/static/upload/image/20240722/1721611371858486.png",
      "/static/upload/image/20240722/1721611373579271.png",
      "/static/upload/image/20240722/1721611376185525.png",
      "/static/upload/image/20240722/1721611379733337.png",
    ],
  },
  "ci-energy-storage-module": {
    gallery: [
      "/static/upload/image/20240724/1721784669297108.png",
      "/static/upload/image/20240724/1721784673324212.png",
      "/static/upload/image/20240724/1721784660784196.png",
    ],
  },
  "ci-energy-storage-converter": {
    gallery: [
      "/static/upload/image/20240723/1721698116778077.png",
      "/static/upload/image/20240723/1721698117207740.png",
      "/static/upload/image/20240723/1721698117928906.png",
    ],
  },
  "three-phase-pv-10-25kw": {
    gallery: [
      "/static/upload/image/20240717/1721203074232946.png",
      "/static/upload/image/20240717/1721203076194935.png",
      "/static/upload/image/20240717/1721203079152578.png",
    ],
  },
  "three-phase-pv-25-50kw": {
    gallery: [
      "/static/upload/image/20240719/1721350885644048.png",
      "/static/upload/image/20240719/1721350888343425.png",
      "/static/upload/image/20240719/1721350891274874.png",
    ],
  },
  "three-phase-pv-80-110kw": {
    gallery: [
      "/static/upload/image/20241008/1728370816676072.png",
      "/static/upload/image/20241008/1728370817568964.png",
      "/static/upload/image/20241008/1728370817363471.png",
    ],
  },
  "wall-mounted-battery-pack": {
    gallery: [
      "/static/upload/image/20250219/1739945438127895.png",
      "/static/upload/image/20250219/1739945438358958.png",
      "/static/upload/image/20250219/1739945430740650.png",
    ],
  },
};

function featureTitle(feature: string) {
  const highlight = feature.match(/IP\d+|<?\d+(?:\.\d+)?\s?ms|>?\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s?A|\d+\s?V/i);

  if (highlight) {
    return highlight[0].replace(/\s+/g, "");
  }

  return feature.split(" ").filter(Boolean).slice(0, 3).join(" ");
}

function buildAdvantages(product: Product): ProductAdvantage[] {
  return (product.features || []).map((feature, index) => ({
    title: featureTitle(feature),
    text: feature,
    icon: advantageIcons[index % advantageIcons.length],
  }));
}

function buildDefaultSpecTable(product: Product): ProductSpecTable {
  return {
    headers: ["Product Model", product.power],
    rows: [
      { label: "Specifications Data", isSection: true },
      ...Object.entries(product.specs || {}).map(([key, value]) => ({
        label: formatSpecLabel(key),
        values: [value],
      })),
    ],
  };
}

function getProductDetail(product: Product) {
  const detail = productDetailAssets[product.id] || {};

  return {
    gallery: [
      product.image,
      ...(detail.gallery || []).filter((image) => image !== product.image),
    ],
    parameterUrl: detail.parameterUrl || DEFAULT_PARAMETER_URL,
    manualUrl: detail.manualUrl || DEFAULT_MANUAL_URL,
    advantages: detail.advantages?.length ? detail.advantages : buildAdvantages(product),
    specsTable: detail.specsTable || buildDefaultSpecTable(product),
  };
}

function renderSpecCells(row: ProductSpecRow, columnCount: number) {
  if (row.isSection) {
    return (
      <td colSpan={columnCount} className="clone-product-parameter-blue">
        {row.label}
      </td>
    );
  }

  const values = row.values || [""];

  if (values.length === 1 && columnCount > 2) {
    return (
      <>
        <td>{row.label}</td>
        <td colSpan={columnCount - 1}>{values[0]}</td>
      </>
    );
  }

  return (
    <>
      <td>{row.label}</td>
      {Array.from({ length: columnCount - 1 }, (_, index) => (
        <td key={`${row.label}-${index}`}>{values[index] || values[values.length - 1] || ""}</td>
      ))}
    </>
  );
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(
    cloneProducts.find((item) => item.id === params.id) || null
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchProduct() {
      const fallback = cloneProducts.find((item) => item.id === params.id) || null;
      let nextProduct: Product | null = fallback;

      try {
        setLoading(true);
        const response = await getProductById(params.id);
        nextProduct = response.data || fallback;
        setProduct(nextProduct);
      } catch {
        setProduct(fallback);
        nextProduct = fallback;
      } finally {
        setLoading(false);
      }

      if (!nextProduct) {
        setRelatedProducts([]);
        return;
      }

      try {
        const response = await getProducts({ category: nextProduct.category });
        setRelatedProducts(
          (response.data || [])
            .filter((item) => item.id !== nextProduct.id)
            .slice(0, 6)
        );
      } catch {
        setRelatedProducts(
          cloneProducts
            .filter((item) => item.category === nextProduct.category && item.id !== nextProduct.id)
            .slice(0, 6)
        );
      }
    }

    void fetchProduct();
  }, [params.id]);

  const detail = useMemo(() => (product ? getProductDetail(product) : null), [product]);

  useEffect(() => {
    if (detail?.gallery.length) {
      setSelectedImage(detail.gallery[0]);
    }
  }, [detail]);

  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <p className="text-gray">{t("products.loading")}</p>
      </section>
    );
  }

  if (!product || !detail) {
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

  const currentImage = selectedImage || detail.gallery[0] || product.image;
  const subCategories = product.subcategory
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  function cycleImage(direction: 1 | -1) {
    if (!detail || detail.gallery.length < 2) return;

    const currentIndex = Math.max(0, detail.gallery.indexOf(currentImage));
    const nextIndex =
      (currentIndex + direction + detail.gallery.length) % detail.gallery.length;
    setSelectedImage(detail.gallery[nextIndex]);
  }

  return (
    <div className="clone-product-detail-page">
      <section className="clone-product-detail-main-hero">
        <RemoteImage
          src={PRODUCT_DETAIL_HERO}
          alt=""
          fill
          priority
          sizes="100vw"
          className="clone-product-detail-bg"
        />

        <div className="clone-product-header-box">
          <div className="clone-product-header-left">
            <h1>{product.name}</h1>

            <div className="clone-product-header-text">
              <RemoteImage
                src={categoryIcons[product.category]}
                alt=""
                width={60}
                height={60}
              />
              <div>
                {subCategories.map((category) => (
                  <Link key={category} href={`/products?category=${product.category}`}>
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <div className="clone-product-header-btns">
              <Link
                href={detail.parameterUrl}
                className="clone-product-header-pdf"
                target="_blank"
                rel="noreferrer"
              >
                {t("products.parameter")}
                <RemoteImage
                  src="/template/default/esimg/icon/xiazai_b.png"
                  alt=""
                  width={17}
                  height={17}
                />
              </Link>
              <Link
                href={detail.manualUrl}
                className="clone-product-header-manual"
                target="_blank"
                rel="noreferrer"
              >
                {t("products.manual")}
                <RemoteImage
                  src="/template/default/esimg/icon/xiazai.png"
                  alt=""
                  width={17}
                  height={17}
                />
              </Link>
            </div>
          </div>

          <div className="clone-product-header-right">
            <div className="clone-product-header-big">
              <RemoteImage
                src={currentImage}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 70vw, 500px"
              />
            </div>
            <div className="clone-product-header-small">
              <button
                type="button"
                className="clone-product-thumb-arrow is-prev"
                onClick={() => cycleImage(-1)}
                aria-label="Previous product image"
              />
              <div className="clone-product-thumbs">
                {detail.gallery.map((image) => (
                  <button
                    type="button"
                    key={image}
                    className={`clone-product-thumb ${
                      image === currentImage ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <RemoteImage src={image} alt="" width={120} height={120} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="clone-product-thumb-arrow is-next"
                onClick={() => cycleImage(1)}
                aria-label="Next product image"
              />
            </div>
          </div>
        </div>

        <div className="clone-breadcrumb clone-product-detail-breadcrumb">
          <RemoteImage
            src="/template/default/esimg/icon/weizhi.png"
            alt=""
            width={17}
            height={18}
          />
          <span>Position:</span>
          <Link href="/">FrontPage</Link>
          <span>&gt;</span>
          <Link href="/products">Product Center</Link>
          {subCategories.map((category) => (
            <span key={category} className="clone-product-crumb-segment">
              <span>&gt;</span>
              <Link href={`/products?category=${product.category}`}>{category}</Link>
            </span>
          ))}
        </div>
      </section>

      {detail.advantages.length > 0 ? (
        <section className="clone-product-intro">
          <h2 className="clone-info-title">{t("products.productAdvantages")}</h2>
          <div className="clone-product-advantage-list">
            {detail.advantages.map((advantage) => (
              <article key={`${advantage.title}-${advantage.text}`} className="clone-product-advantage-item">
                <RemoteImage
                  src={advantage.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="clone-product-advantage-icon"
                />
                <h3>{advantage.title}</h3>
                <p>{advantage.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="clone-product-intro">
        <h2 className="clone-info-title">{t("products.technicalSpecifications")}</h2>
        <div className="clone-product-parameter-content">
          <table className="clone-product-parameter-table">
            <tbody>
              <tr className="clone-product-parameter-header">
                {detail.specsTable.headers.map((header) => (
                  <td key={header}>{header}</td>
                ))}
              </tr>
              {detail.specsTable.rows.map((row, index) => (
                <tr
                  key={`${row.label}-${index}`}
                  className={row.isSection ? "clone-product-parameter-section" : ""}
                >
                  {renderSpecCells(row, detail.specsTable.headers.length)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="clone-case-product-box">
          <h2 className="clone-info-title">{t("products.recommendedProducts")}</h2>
          <div className="clone-related-track">
            {relatedProducts.map((related) => (
              <article key={related.id} className="clone-related-card">
                <div className="clone-related-copy">
                  <h3>{related.name}</h3>
                  <div>{related.subcategory}</div>
                  <p>{related.description}</p>
                  <Link href={`/products/${related.id}`} className="clone-product-more">
                    {t("products.more")}
                  </Link>
                </div>
                <Link href={`/products/${related.id}`} className="clone-related-image">
                  <RemoteImage
                    src={related.image}
                    alt={related.name}
                    fill
                    sizes="(max-width: 900px) 70vw, 320px"
                  />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <BigMessageForm defaultProduct={product.name} />
    </div>
  );
}
