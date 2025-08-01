/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
  basePath: '',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: false,
  },
  // Ensure all routes are statically generated
  generateStaticParams: true,
  // Disable server components that could cause issues
  swcMinify: true,
  // Optimize for static deployment
  cleanDistDir: true
}

export default nextConfig