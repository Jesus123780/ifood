import { ApolloServer } from 'apollo-server-micro'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
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
    context: withSession(async ({ req, next, connection }) => {
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
            return connection.context;
        } else {
            const setCookies = []
            const setHeaders = []
            //  Initialize PubSub
            const { token } = req.session.get('user') || {}
            tokenClient = req.headers.authorization?.split(' ')[1]
            const restaurant = req.headers.restaurant || {}
            const excluded = ['/login', '/forgotpassword', '/register', '/teams/invite/[id]', '/teams/manage/[id]']
            if (excluded.indexOf(req.session) > -1) return next()
            const { error } = await getUserFromToken(token)
            if (error) req.session.destroy()
            if (token) {
                User = await jwt.verify(token, process.env.AUTHO_USER_KEY)
                return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, restaurant: restaurant || {} }
            } else if (tokenClient) {
                User = await jwt.verify(tokenClient, process.env.AUTHO_USER_KEY)
                return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, restaurant: restaurant || {} }
            }
            return { req, setCookies: [], setHeaders: [], User: User || {}, restaurant: restaurant || {} }

        }
    }),
    subscriptions: {
        path: '/api/graphqlSubscriptions',
        keepAlive: 9000,
        // eslint-disable-next-line no-unused-vars
        onConnect: (connectionParams, webSocket, context) => console.log('connected'),
        onDisconnect: (webSocket, context) => console.log('disconnected')
    },
    playground: {
        subscriptionEndpoint: '/api/graphqlSubscriptions',
        settings: {
            'request.credentials': 'same-origin'
        }
    }
})
const startServer = apolloServer.start();

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
        res.end();
        return false;
    }
    await startServer;
    const handler = (apolloServer.createHandler({ path: '/api/graphql' }))
    return handler(req, res)
})
export const config = {
    api: {
        bodyParser: false,
        playground: true,
    }
}
