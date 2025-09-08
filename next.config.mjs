/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow requests from all hosts (required for Replit proxy)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },

  // Experimental features
  experimental: {
    esmExternals: 'loose',
  },

  // Image optimization
  images: {
    domains: ['blob.v0.dev'],
    unoptimized: true,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
