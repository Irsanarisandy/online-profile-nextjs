/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/tags',
        destination: '/posts',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com']
  },
};
