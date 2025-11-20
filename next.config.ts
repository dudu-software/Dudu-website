import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
        protocol: "https",
        hostname: "backend.dudusoftware.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
