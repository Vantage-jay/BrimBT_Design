import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Disable ESLint during production builds
  // ESLint errors won't block deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
