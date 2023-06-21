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
  }
};

const BundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const PWA = require('next-pwa')({
  dest: 'public'
});

const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([BundleAnalyzer, PWA], nextConfig);
