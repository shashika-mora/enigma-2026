/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    devtoolSegmentExplorer: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable persistent disk caching in dev to prevent Windows file-lock rename errors
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
