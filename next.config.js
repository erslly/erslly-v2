/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/erslly',
        permanent: true,
      },
      {
        source: '/x',
        destination: 'https://x.com/ersllydev',
        permanent: true,
      },
    ]
  },
}
