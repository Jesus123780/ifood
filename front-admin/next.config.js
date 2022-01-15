// next.config.js
module.exports = {
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