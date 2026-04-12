/**
 * Navigation menu configuration
 * Định nghĩa cấu trúc menu cho website
 */

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "PV Inverters", href: "/products?category=pv-inverters" },
      { label: "Energy Storage", href: "/products?category=energy-storage" },
      { label: "Hybrid Inverters", href: "/products?category=hybrid-inverters" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About Us", href: "/company" },
      { label: "Certifications", href: "/company#certifications" },
    ],
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Support",
    href: "/support",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const PRODUCT_CATEGORIES = [
  { id: "pv-inverters", label: "PV Inverters", icon: "⚡" },
  { id: "energy-storage", label: "Energy Storage", icon: "🔋" },
  { id: "hybrid-inverters", label: "Hybrid Inverters", icon: "🔄" },
];

export const COMPANY_INFO = {
  name: "SolarTech Energy",
  fullName: "SolarTech Energy Co., Ltd.",
  slogan: "Powering the Future with Clean Energy",
  phone: "+84 28 1234 5678",
  email: "info@solartech-energy.com",
  address: "123 Green Energy Boulevard, District 7, Ho Chi Minh City, Vietnam",
};
