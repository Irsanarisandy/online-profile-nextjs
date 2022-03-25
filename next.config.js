/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public'
  },
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
});
