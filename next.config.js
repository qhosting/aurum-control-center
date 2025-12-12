/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.dicebear.com', 'localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  typescript: {
    // Ignorar errores de TypeScript en build (solo para desarrollo)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Advertir sobre errores de ESLint en build
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
