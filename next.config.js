/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'launchpad-front-end.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
