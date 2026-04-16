import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.4.212.222"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.uniconvtor.com",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
