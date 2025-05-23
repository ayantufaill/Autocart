import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.rawpixel.com",
      "images.pexels.com",
      "images.rawpixel.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
