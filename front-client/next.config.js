const { ADMIN_URL } = process.env

module.exports = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
            {
                source: '/admin',
                destination: `${ ADMIN_URL }/admin`,
            },
            {
                source: '/admin/:path*',
                destination: `${ ADMIN_URL }/admin/:path*`,
            },
        ]
    },
}
