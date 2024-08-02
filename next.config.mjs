/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
