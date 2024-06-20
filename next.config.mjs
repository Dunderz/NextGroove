/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kxigvxqpwfrulirieurg.supabase.co"],
  },
  webpack: (config, _) => ({
    ...config,
    watchOptions: {
      ...config.watchOptions,
      poll: 800,
      aggregateTimeout: 200,
    },
  }),
};

export default nextConfig;
