import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.4.212.222"],
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;
