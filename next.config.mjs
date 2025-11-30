/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Export static HTML for GitHub Pages
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  reactCompiler: true,
};

export default nextConfig;
