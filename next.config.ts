const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "ih1.redbubble.net",
      },
    ],
  },
};

module.exports = nextConfig;
