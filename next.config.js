/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ '127.0.0.1', process.env.NEXT_PUBLIC_IMAGE_SERVER, '*cyclegan.site', 'github.com' ],
  },
  output: 'standalone',
};
module.exports = nextConfig;
