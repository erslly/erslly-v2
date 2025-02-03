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
      {
        source: '/instagram',
        destination: 'https://instagram.com/erdemozbebek_',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.com/users/815668704435896321',
        permanent: true,
      },
    ]
  },
}
