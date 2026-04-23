"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useHasMounted from "@/hooks/useHasMounted";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useHasMounted();

  useEffect(() => {
    if (!isLoading && mounted) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, router, mounted]);

  if (!mounted || isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const navItems = [
    { name: t("admin.products"), href: "/admin", icon: "📦" },
  ];

  return (
    <div className="admin-layout min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="admin-sidebar w-64 bg-white border-r border-gray-200 hidden md:block sticky overflow-y-auto z-40">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-dark">{t("admin.panel")}</h2>
          <p className="text-sm text-gray mt-1">{t("admin.welcome")} {user?.name}</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-dark"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
