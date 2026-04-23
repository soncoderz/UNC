import type { NextConfig } from "next";
import path from "path";

const backendUrl = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");
const extraAllowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: [
    "26.4.212.222",
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    ...extraAllowedDevOrigins,
  ],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.uniconvtor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
