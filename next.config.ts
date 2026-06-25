import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "flowlog";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : "",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.7"]
};

export default nextConfig;
