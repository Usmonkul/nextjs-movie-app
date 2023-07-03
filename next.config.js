/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "cdn.wallpapersafari.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
