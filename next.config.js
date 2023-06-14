/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ '127.0.0.1', 'ik.imagekit.io', '*cyclegan.site', '*styleswap.art', 'github.com' ],
  },
};
module.exports = nextConfig;
