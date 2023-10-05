/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.discordapp.com", "picsum.photos", "cloudflare-ipfs.com"],
  },
  experimental: { serverActions: true },
};

module.exports = nextConfig;
