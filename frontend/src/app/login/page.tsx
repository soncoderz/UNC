"use client";

import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import InnerHero from "@/components/uniconvtor/InnerHero";
import { innerBanners } from "@/data/uniconvtor";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If they are already logged in, push to admin
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <>
      <InnerHero
        title="Admin Portal"
        subtitle="Sign in to manage the website"
        image={innerBanners.contact}
      />

      <section className="py-20 bg-light">
        <div className="max-w-[500px] mx-auto px-4 lg:px-0">
          <div className="bg-white p-8 xl:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-dark mb-6 text-center">
              Admin Access
            </h2>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="admin@unc.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-[#e06612] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-4"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

