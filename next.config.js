/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/accounts/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
