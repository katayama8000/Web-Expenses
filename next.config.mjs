/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['page.tsx', 'page.ts'],
  images: {
    domains: ["foqiugpmvvsehxuplcha.supabase.co"],
  },
};

export default nextConfig;
