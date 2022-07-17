/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { ApolloServer } from 'apollo-server-micro'
import httpHeadersPlugin from './lib/hooks/apollo-plugin-http-header'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import Cors from 'micro-cors'
import typeDefs from '../api/lib/typeDefs'
import jwt from 'jsonwebtoken'
import resolvers from '../api/lib/resolvers/index'
import { getUserFromToken } from './auth'
import { getIronSession } from 'iron-session'
import { requestDidStartPlugin } from './lib/hooks/apollo-plugin'
import { parseCookies } from './lib/utils'
// import { withIronSessionApiRoute } from 'iron-session/next'
// import Cors from './lib/hooks/micro-cors'

const corsMultipleAllowOrigin = (options = {}) => {
  const { origin: optionsOrigin } = options || {}
  const multiple = Array.isArray(optionsOrigin)
  if (multiple && optionsOrigin.length === 0) {
    throw new Error('`options.origin` must not be empty')
  }
  return handler => {
    return (req, res, ...restArgs) => {
      if (multiple) {
        const { origin } = req.headers || {}
        if (optionsOrigin.includes(origin)) {
          options.origin = origin
        } else {
          options.origin = ' '
        }
      }

      return Cors(options)(handler)(req, res, ...restArgs)
    }
  }
}
const cors = corsMultipleAllowOrigin({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000', 'http://localhost:3003'] })
let serverCleanup = null

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),
    httpHeadersPlugin,
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup?.dispose()
          }
        }
      }
    },
    requestDidStartPlugin],
  context: (async ({ req, res, next, connection }) => {
    const session = await getIronSession(req, res, {
      password: process.env.SESSION_KEY,
      cookieName: process.env.SESSION_NAME,
      cookieOptions: {
        maxAge: 60 * 60 * 8, // 8 hours,
        secure: process.env.NODE_ENV === 'production'
      }
    })
    const { user } = session || {}
    const { token } = user || {}
    parseCookies(req)
    res.setHeader('x-token-access', `${token}`)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH')
    let tokenClient
    let User = {}
    if (connection) {
      // check connection for metadata
      return connection.context
    }
    //  Initialize Array empty
    const setCookies = []
    const setHeaders = []
    tokenClient = req.headers.authorization?.split(' ')[1]
    const restaurant = req.headers.restaurant || {}
    const { error } = await getUserFromToken(token)
    // console.log(error, 'HOLA MUNDO PAPUUUUUUUUUU')
    // console.log(req, 'func')
    // if (error === true) return req.session.destroy()

    const excluded = ['/login', '/forgotpassword', '/register', '/teams/invite/[id]', '/teams/manage/[id]']
    if (excluded.indexOf(req.session) > -1) return next()
    if (token) {
      User = await jwt.verify(token, process.env.AUTHO_USER_KEY)
      return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, restaurant: restaurant || {} }
    } else if (tokenClient) {
      User = await jwt.verify(tokenClient, process.env.AUTHO_USER_KEY)
      return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, restaurant: restaurant || {} }
    }
    return { req, setCookies: [], setHeaders: [], User: User || {}, restaurant: restaurant || {} }
  }),
  subscriptions: {
    path: '/api/graphqlSubscriptions',
    keepAlive: 9000,
    // eslint-disable-next-line no-unused-vars
    onConnect: (connectionParams, webSocket, context) => { return console.log('connected') },
    onDisconnect: () => { return console.log('disconnected') }
  },
  playground: {
    subscriptionEndpoint: '/api/graphqlSubscriptions',
    settings: {
      'request.credentials': 'same-origin'
    }
  }
})
const startServer = apolloServer.start()

export default cors(async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'http://localhost:3000'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  const handler = (apolloServer.createHandler({ path: '/api/graphql' }))
  return handler(req, res)
})
export const config = {
  api: {
    bodyParser: false,
    playground: true
  }
}
