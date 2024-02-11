/** @type {import('next').NextConfig} */

const basePath = process.env.BASEPATH || undefined;
const pathPrefix = process.env.PATHPREFIX || undefined;

const nextConfig = {
  output: "export",
  // distDir: "./out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: pathPrefix,
  basePath: basePath,
};

export default nextConfig;
