/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "safetest.ir",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  output: 'export',
};

module.exports = nextConfig;
