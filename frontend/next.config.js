/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gw.alipayobjects.com',
      },
    ],
  },
};

module.exports = nextConfig;
