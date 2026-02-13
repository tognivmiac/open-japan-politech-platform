import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@ojpp/ui", "@ojpp/api", "@ojpp/db"],
};
export default nextConfig;
