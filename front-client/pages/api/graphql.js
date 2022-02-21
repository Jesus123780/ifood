import { ApolloServer } from 'apollo-server-micro'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import withSession from '../../apollo/session'
import Cors from 'micro-cors'
import typeDefs from '../api/lib/typeDefs'
import jwt from 'jsonwebtoken'
import resolvers from '../api/lib/resolvers/index'

const cors = Cors()

const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), httpHeadersPlugin],
    context: withSession(async ({ req, next, connection }) => {
        if (connection) {
            // check connection for metadata
            return connection.context;
        } else {
            //  Initialize as empty arrays - resolvers will add items if required
            const setCookies = []
            const setHeaders = []
            //  Initialize PubSub
            const { token } = req.session.get('user') || {}
            const idComp = req.headers.authorization?.split(' ')[1]
            const restaurant = req.headers.restaurant || {}
            const excluded = ['/login', '/forgotpassword', '/register', '/teams/invite/[id]', '/teams/manage/[id]']
            if (excluded.indexOf(req.session) > -1) return next()
            if (token) {
                const User = await jwt.verify(token, process.env.AUTHO_USER_KEY)
                return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, idComp, restaurant: restaurant || {} }
            }
            return { req, setCookies: [], setHeaders: [], User: null || {}, idComp: null || {},  restaurant: restaurant || {}}

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
    cors()
    if (req.method === 'OPTIONS') {
        res.end()
        return
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
