/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/brand', '@repo/feature-dashboard', '@repo/feature-auth'],
};

export default nextConfig;
