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
    children: [
      { label: "Milestone", href: "/company#milestone" },
      { label: "Honor", href: "/company#honor" },
      { label: "Company Introduction", href: "/company#intro" },
      { label: "Corporate News", href: "/news" },
    ],
  },
  {
    label: "Solution",
    href: "/solutions",
    children: [
      { label: "Household Energy Storage Solutions", href: "/solutions/household" },
      { label: "Industrial and Commercial Energy Storage", href: "/solutions/commercial" },
      { label: "Photovoltaic System Solutions", href: "/solutions/photovoltaic" },
    ],
  },
  {
    label: "Product Center",
    href: "/products",
    children: [
      { label: "Household Energy Storage", href: "/products?category=hybrid-inverters" },
      { label: "Industrial and Commercial Energy Storage", href: "/products?category=energy-storage" },
      { label: "Photovoltaic System", href: "/products?category=pv-inverters" },
    ],
  },
  {
    label: "R&D and Manufacturing",
    href: "/rnd",
    children: [
      { label: "R&D Capabilities", href: "/rnd#research" },
      { label: "Batch Production Capabilities", href: "/rnd#produce" },
      { label: "Quality Assurance", href: "/rnd#quality" },
    ],
  },
  {
    label: "Technical Support",
    href: "/support",
    children: [
      { label: "Technical Support", href: "/support#technical" },
      { label: "After sale services", href: "/support#afterSales" },
      { label: "Data Download", href: "/support#download" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
] satisfies NavItem[];

export const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  { id: "hybrid-inverters", label: "Household Energy Storage", icon: "HES" },
  { id: "energy-storage", label: "Industrial and Commercial Energy Storage", icon: "C&I" },
  { id: "pv-inverters", label: "Photovoltaic System", icon: "PV" },
];

export const COMPANY_INFO = {
  name: "UNC",
  fullName: "Qingdao UNC Technology Co., Ltd",
  slogan: "UNC a new driving force for green energy",
  phone: "0532-85612972",
  email: "unc-service@unc-energy.com",
  address: "No. 115, Jifu Road, Chengyang District, Qingdao City, Shandong Province",
};

export const FOOTER_LINKS = {
  aboutUs: {
    title: "About Us",
    links: [
      { label: "Milestone", href: "/company#milestone" },
      { label: "Honor", href: "/company#honor" },
      { label: "Company Introduction", href: "/company#intro" },
      { label: "Corporate News", href: "/news" },
    ],
  },
  losung: {
    title: "Solution",
    links: [
      { label: "Household Energy Storage Solutions", href: "/solutions/household" },
      { label: "Industrial and Commercial Energy Storage", href: "/solutions/commercial" },
      { label: "Photovoltaic System Solutions", href: "/solutions/photovoltaic" },
    ],
  },
  products: {
    title: "Product Center",
    links: [
      { label: "Household Energy Storage", href: "/products?category=hybrid-inverters" },
      { label: "Industrial and Commercial Energy Storage", href: "/products?category=energy-storage" },
      { label: "Photovoltaic System", href: "/products?category=pv-inverters" },
    ],
  },
  rnd: {
    title: "R&D and Manufacturing",
    links: [
      { label: "R&D Capabilities", href: "/rnd#research" },
      { label: "Batch Production Capabilities", href: "/rnd#produce" },
      { label: "Quality Assurance", href: "/rnd#quality" },
    ],
  },
  support: {
    title: "Technical Support",
    links: [
      { label: "Technical Support", href: "/support#technical" },
      { label: "After sale services", href: "/support#afterSales" },
      { label: "Data Download", href: "/support#download" },
    ],
  },
} satisfies Record<string, FooterLinkGroup>;
