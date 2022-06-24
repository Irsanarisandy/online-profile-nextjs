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
  images: {
    domains: ['res.cloudinary.com']
  }
};

const withPWA = require('next-pwa')({
  dest: 'public'
});

module.exports = withPWA(nextConfig);
