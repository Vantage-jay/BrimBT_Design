
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Add domains here when you connect a real image CDN e.g. Cloudinary
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // Enables faster builds
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
