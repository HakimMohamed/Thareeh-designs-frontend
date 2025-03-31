const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
    domains: ["d1lyd5qwhzw3jy.cloudfront.net"],
  },
};

module.exports = nextConfig;
