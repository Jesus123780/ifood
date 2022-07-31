// import { ApolloServer } from 'apollo-server-micro'
// import { makeExecutableSchema } from '@graphql-tools/schema'
// import { useServer } from 'graphql-ws/lib/use/ws'
// import Cors from 'micro-cors'
// import { WebSocketServer } from 'graphql-ws'
// import typeDefs from '../api/lib/typeDefs'
// import resolvers from '../api/lib/resolvers/index'
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

// const schema = makeExecutableSchema({ typeDefs, resolvers })

// const cors = Cors()

// let serverCleanup = null

// const apolloServer = new ApolloServer({
//   schema,
//   plugins: [
//     ApolloServerPluginLandingPageGraphQLPlayground(), // Proper shutdown for the WebSocket server.
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup?.dispose()
//           }
//         }
//       }
//     }
//   ],
//   context: (async ({ req, res, next, connection }) => {
//     return { req, setCookies: [], setHeaders: [], User: {}, restaurant: {} }
//   })
// })

// const startServer = apolloServer.start()

// const getHandler = async () => {
//   await startServer
//   return apolloServer.createHandler({
//     path: '/api/apollo-suspcriptions'
//   })
// }

// const wsServer = new WebSocketServer({
//   noServer: true
// })

// export default cors(async function handler(req, res) {
//   if (req.method === 'OPTIONS') {
//     res.end()
//     return false
//   }
//   res.socket.server.ws ||= (() => {
//     res.socket.server.on('upgrade', function (request, socket, head) {
//       wsServer.handleUpgrade(request, socket, head, function (ws) {
//         wsServer.emit('connection', ws)
//       })
//     })
//     serverCleanup = useServer({ schema }, wsServer)
//     return wsServer
//   })()

//   const h = await getHandler()

//   await h(req, res)
// })

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
