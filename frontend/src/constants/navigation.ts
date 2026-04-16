/**
 * Navigation menu configuration
 * Định nghĩa cấu trúc menu cho website UNC Energy
 */

import type { ProductCategory } from "@/types/api";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface ProductCategoryItem {
  id: ProductCategory;
  label: string;
  icon: string;
}

interface FooterLinkGroup {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/company",
  },
  {
    label: "Lösung",
    href: "/solutions",
    children: [
      { label: "Soluciones de almacenamiento de energía para el hogar", href: "/solutions/household" },
      { label: "almacenamiento de energía comercial e industrial", href: "/solutions/commercial" },
      { label: "Soluciones de sistemas fotovoltaicos", href: "/solutions/photovoltaic" },
    ],
  },
  {
    label: "Centro de productos",
    href: "/products",
    children: [
      { label: "PV Inverters", href: "/products?category=pv-inverters" },
      { label: "Energy Storage", href: "/products?category=energy-storage" },
      { label: "Hybrid Inverters", href: "/products?category=hybrid-inverters" },
    ],
  },
  {
    label: "R&D and Manufacturing",
    href: "/rnd",
    children: [
      { label: "R&D Capacidades", href: "/rnd#capacidades" },
      { label: "Capacidades de producción por lotes", href: "/rnd#produccion" },
      { label: "Seguro de calidad", href: "/rnd#calidad" },
    ],
  },
  {
    label: "Apoyo técnico",
    href: "/support",
    children: [
      { label: "Apoyo técnico", href: "/support#technical" },
      { label: "Servicios post venta", href: "/support#postventa" },
      { label: "Data Download", href: "/support#download" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
] satisfies NavItem[];

export const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  { id: "pv-inverters", label: "PV Inverters", icon: "⚡" },
  { id: "energy-storage", label: "Energy Storage", icon: "🔋" },
  { id: "hybrid-inverters", label: "Hybrid Inverters", icon: "🔄" },
];

export const COMPANY_INFO = {
  name: "UNC",
  fullName: "UNC Energy Co., Ltd.",
  slogan: "UNC: a new driving force for green energy",
  phone: "0532-85612972",
  email: "andy@unc-energy.com",
  address: "No. 115, Jifu Road, Chengyang District, Qingdao City, Shandong Province",
};

export const FOOTER_LINKS = {
  aboutUs: {
    title: "About Us",
    links: [
      { label: "Hitu", href: "/company#hitu" },
      { label: "Honor", href: "/company#honor" },
      { label: "Introducción de la empresa", href: "/company#intro" },
      { label: "Noticias corporativas", href: "/news" },
    ],
  },
  losung: {
    title: "Lösung",
    links: [
      { label: "Soluciones de almacenamiento de energía para el hogar", href: "/solutions/household" },
      { label: "almacenamiento de energía comercial e industrial", href: "/solutions/commercial" },
      { label: "Soluciones de sistemas fotovoltaicos", href: "/solutions/photovoltaic" },
    ],
  },
  products: {
    title: "Centro de productos",
    links: [
      { label: "PV Inverters", href: "/products?category=pv-inverters" },
      { label: "Energy Storage", href: "/products?category=energy-storage" },
      { label: "Hybrid Inverters", href: "/products?category=hybrid-inverters" },
    ],
  },
  rnd: {
    title: "R&D and Manufacturing",
    links: [
      { label: "R&D Capacidades", href: "/rnd#capacidades" },
      { label: "Capacidades de producción por lotes", href: "/rnd#produccion" },
      { label: "Seguro de calidad", href: "/rnd#calidad" },
    ],
  },
  support: {
    title: "Apoyo técnico",
    links: [
      { label: "Apoyo técnico", href: "/support#technical" },
      { label: "Servicios post venta", href: "/support#postventa" },
      { label: "Data Download", href: "/support#download" },
    ],
  },
} satisfies Record<string, FooterLinkGroup>;
