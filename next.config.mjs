/** @type {import('next').NextConfig} */

const pathPrefix =
  process.env.LOCATION === "GH_PAGES" ? "/still-river-website/" : "";

console.log("Loading for", process.env.LOCATION);

const nextConfig = {
  output: "export",
  distDir: "./out",
  images: {
    unoptimized: true,
  },
  assetPrefix: pathPrefix,
};

export default nextConfig;
