/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'damq7wwre4tgf.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
