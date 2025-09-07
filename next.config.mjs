/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude Node.js modules from client-side bundles
    if (!isServer) {
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
        util: false,
        buffer: false,
        events: false,
        querystring: false,
        punycode: false,
        // Exclude node: protocol imports
        "node:fs": false,
        "node:path": false,
        "node:crypto": false,
        "node:stream": false,
        "node:util": false,
        "node:url": false,
        "node:buffer": false,
        "node:process": false,
        "node:os": false,
        "node:events": false,
        "node:http": false,
        "node:https": false,
        "node:zlib": false,
        "node:querystring": false,
        "node:net": false,
        "node:tls": false,
        "node:assert": false,
      }

      // Completely exclude problematic packages from client bundle
      config.externals = config.externals || []
      config.externals.push({
        "pptxgenjs": "pptxgenjs",
        "docx": "docx",
        "fs": "fs",
        "path": "path",
        "crypto": "crypto",
        "stream": "stream",
        "util": "util",
        "url": "url",
        "zlib": "zlib",
        "http": "http",
        "https": "https",
        "net": "net",
        "tls": "tls",
        "os": "os",
        "events": "events",
        "buffer": "buffer",
        "querystring": "querystring",
        "punycode": "punycode",
        "assert": "assert",
      })
    }

    // Add ignore plugin for Node.js modules
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(pptxgenjs|docx|fs|path|crypto|stream|util|url|zlib|http|https|net|tls|os|events|buffer|querystring|punycode|assert)$/,
      })
    )

    // Add null-loader for problematic packages
    config.module.rules.push({
      test: /node_modules[\/\\](pptxgenjs|docx)[\/\\]/,
      use: "null-loader",
    })

    return config
  },

  // Experimental features for better performance
  experimental: {
    esmExternals: 'loose',
    optimizePackageImports: ["recharts", "lucide-react", "@radix-ui/react-icons"],
  },

  // Image optimization
  images: {
    domains: ["blob.v0.dev"],
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
