import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.animationxpress.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media.sketchfab.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
