import Link from "next/link";
import { NAV_ITEMS, COMPANY_INFO } from "@/constants/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="font-heading font-bold text-lg">
                {COMPANY_INFO.name}
              </span>
            </Link>
            <p className="text-gray text-sm leading-relaxed mb-6">
              {COMPANY_INFO.slogan}. Leading manufacturer of solar inverters and
              energy storage systems for a sustainable future.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              {["Facebook", "LinkedIn", "YouTube", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-10 h-10 rounded-lg bg-dark-light hover:bg-primary flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-sm">
                    {social === "Facebook" && "f"}
                    {social === "LinkedIn" && "in"}
                    {social === "YouTube" && "▶"}
                    {social === "Twitter" && "𝕏"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray text-sm hover:text-primary-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products?category=pv-inverters"
                  className="text-gray text-sm hover:text-primary-light transition-colors"
                >
                  PV Inverters
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=energy-storage"
                  className="text-gray text-sm hover:text-primary-light transition-colors"
                >
                  Energy Storage
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=hybrid-inverters"
                  className="text-gray text-sm hover:text-primary-light transition-colors"
                >
                  Hybrid Inverters
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray text-sm hover:text-primary-light transition-colors"
                >
                  Downloads & Manuals
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-primary-light transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-primary-light transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray text-sm">
            © {currentYear} {COMPANY_INFO.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray">
            <a href="#" className="hover:text-primary-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-light transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
