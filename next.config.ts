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
        hostname: "d1lyd5qwhzw3jy.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
