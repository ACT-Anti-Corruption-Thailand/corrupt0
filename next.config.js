/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/corrupt0" : "", // For staging
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
