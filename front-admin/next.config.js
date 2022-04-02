// next.config.js
module.exports = {
  images: {
    domains: ['http2.mlstatic.com', 'localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
  // basePath: '/admin'
};