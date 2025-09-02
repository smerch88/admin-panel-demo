import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "inharmony-v1.h.goit.study",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  // Configure for production deployment
  output: "standalone",
  // Ensure static assets are served correctly
  trailingSlash: false,
  // Handle base path if needed
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  // Configure asset loading
  experimental: {
    // Enable modern features
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
