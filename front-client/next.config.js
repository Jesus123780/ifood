const { ADMIN_URL } = process.env

module.exports = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
            {
                source: '/',
                destination: `${ADMIN_URL}/`,
            },
            {
                source: '/:path*',
                destination: `${ADMIN_URL}/:path*`,
            },
            {
                source: '/api/:path*',
                destination:  `${ADMIN_URL}/:path*`,
            },
        ]
    },
}
