/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle es-toolkit and other problematic packages
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    }

    // Transpile packages that need it
    config.transpilePackages = [
      'recharts',
      'es-toolkit',
      '@ai-sdk/openai',
      '@ai-sdk/anthropic', 
      '@ai-sdk/google',
      'jspdf',
      'xlsx'
    ]

    // Ignore problematic dependencies on client side
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'pptxgenjs': false,
        'docx': false,
        'canvas': false,
      }
    }

    // Handle module resolution
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    }

    // Update canvas alias
    config.resolve.alias.canvas = false

    return config
  },
  
  // Suppress warnings for known issues
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Experimental features
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['jspdf'], // Updated list
  },

  // Image optimization
  images: {
    domains: ['blob.v0.dev'],
    unoptimized: true,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
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
