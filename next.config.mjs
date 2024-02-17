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
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
