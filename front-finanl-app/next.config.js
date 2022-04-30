/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants')

const nextConfig = {
  reactStrictMode: true
}

module.exports = (phase) => {
  // npm run dev or next dev
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  // npm run build or next build
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'

  // npm run build or next build
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    URL_BASE: (() => {
      if (isDev) return 'http://localhost:3000/'
      if (isProd) return 'http://ifood.com'
      if (isStaging) return 'Title Stg'
    })()
  }
  const resolveUniqueReactForHooks = {
    webpack: (config, options) => {
      if (options.isServer) {
        config.externals = ['react', ...config.externals]
      }

      // eslint-disable-next-line no-undef
      config.resolve.alias.react = reactPath

      return config
    },
    images: {
      domains: ['localhost']
    }
  }
  const headers = () => {
    return [
      {
        source: '/app',
        headers: [
          {
            key: 'x-custom-header-1',
            value: 'my custom header 1'
          }
        ]
      }
    ]
  }

  const redirects = () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ]
  }
  const basePath = '/app'
  // puedes sobre escribir la ruta
  const rewrites = () => {
    return [
      {
        source: '/ab',
        destination: '/about'
      }
    ]
  }
  const assetPrefix = isProd ? 'https://cdn.mydomain.com' : ''
  return {
    env,
    headers,
    nextConfig,
    basePath,
    rewrites,
    redirects,
    assetPrefix,
    resolveUniqueReactForHooks
  }
}

// module.exports = nextConfig
