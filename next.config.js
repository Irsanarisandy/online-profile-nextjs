/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/tags',
        destination: '/posts',
        permanent: true
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html'
      }
    ];
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  // https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration
  experimental: {
    appDir: true
  }
};

const withPWA = require('next-pwa')({
  dest: 'public'
});

module.exports = withPWA(nextConfig);
