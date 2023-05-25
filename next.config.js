/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "test-sandelys.fra1.cdn.digitaloceanspaces.com",
      "test-sandelys.fra1.digitaloceanspaces.com",
      "sandelys.fra1.cdn.digitaloceanspaces.com",
      "sandelys.fra1.digitaloceanspaces.com",
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
    ]
  }
}

module.exports = nextConfig
