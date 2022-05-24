/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { ApolloServer } from 'apollo-server-micro'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import withSession from '../../apollo/session'
import Cors from 'micro-cors'
import typeDefs from '../api/lib/typeDefs'
import jwt from 'jsonwebtoken'
import resolvers from '../api/lib/resolvers/index'
import { getUserFromToken } from './auth'

const cors = Cors()

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), httpHeadersPlugin],
  context: (async ({ req, next, connection }) => {
    let tokenClient
    let User = {}
    // const DeviceDetector = require('node-device-detector');
    // const detector = new DeviceDetector;
    // const resultOs = detector.parseOs(req.headers.useragent);
    // const resultClient = detector.parseClient(req.headers.useragent);
    // const resultDeviceType = detector.parseDeviceType(req.headers.useragent, resultOs, resultClient, {});
    // const result = Object.assign({ os: resultOs }, { client: resultClient }, { device: resultDeviceType }, { deviceId: req.headers.deviceid });
    // console.log('Result parse lite', result);
    if (connection) {
      // check connection for metadata
      return connection.context
    } 
    const setCookies = []
    const setHeaders = []
    //  Initialize PubSub
    // const { token } = req.session.get('user') || {}
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianV2aW5hb2plc3VzZEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imp1dmluYW9qZXN1c2RAZ21haWwuY29tIiwicmVzdGF1cmFudCI6eyJpZFN0b3JlIjoiTWpjeU1EZzRPREUwT0RVeE5URTJORFV3IiwiaWQiOiJNamN5TURnNE9ERTBPRFV4TlRFMk5EVXcifSwiaWQiOiJNamN5TURnNE9ERTBPRFV4TlRFMk5EVXciLCJpYXQiOjE2NTMxOTgwOTIsImV4cCI6MTY1MzUzMTM5Mn0.PE4x0OngTinrKdztA0O-NBW9Ka7Rn0omWYwaBAg75cA'
    token = req.headers.usuario
    console.log(token)
    tokenClient = req.headers.authorization?.split(' ')[1]
    const restaurant = req.headers.restaurant || {}
    const excluded = ['/login', '/forgotpassword', '/register', '/teams/invite/[id]', '/teams/manage/[id]']
    if (excluded.indexOf(req.session) > -1) return next()
    const { error } = await getUserFromToken(token)
    // if (error) req.session.destroy()
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
    onConnect: (connectionParams, webSocket, context) => {return console.log('connected')},
    onDisconnect: () => {return console.log('disconnected')}
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
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader(
  //     "Access-Control-Allow-Origin",
  //     "http://localhost:3000"
  // );
  // res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
  // );
  // res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  // );
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
