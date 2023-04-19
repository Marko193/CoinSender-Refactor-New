/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output:  'standalone' | 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePath: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'http://localhost:3000/api' // production api
  }
};

module.exports = nextConfig;
