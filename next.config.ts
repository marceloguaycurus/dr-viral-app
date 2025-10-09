import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Fail build on TypeScript errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Fail build on ESLint errors
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
