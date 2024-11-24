const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
