/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "test-sandelys.fra1.cdn.digitaloceanspaces.com",
      "test-sandelys.fra1.digitaloceanspaces.com",
      "sandelys.fra1.cdn.digitaloceanspaces.com",
      "sandelys.fra1.digitaloceanspaces.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.xx.fbcdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.twimg.com',
        port: '',
      },
    ],
  }
}

module.exports = nextConfig
