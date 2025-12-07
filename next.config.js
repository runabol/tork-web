/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/jobs',
        permanent: false,
      },
    ]
  },
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
}

module.exports = nextConfig