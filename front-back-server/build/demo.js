'use strict';

var _express = _interopRequireDefault(require("express"));

var _apolloServer = require("apollo-server");

var _typeDefs = _interopRequireDefault(require("./api/lib/typeDefs"));

var _resolvers = _interopRequireDefault(require("./api/lib/resolvers"));

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _graphql = require("graphql");

var _apolloServerCore = require("apollo-server-core");

var _schema = require("@graphql-tools/schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init Server
const app = (0, _express.default)();
const port = 4000;
const subscriptionsEndpoint = `ws://localhost:${port}/subscriptions`; // Init pubsub  
// app.get('/', (req, res) =>{
//     res.send({
//         message: 'Hola mundo'
//     })
// })

/** Configurar cabeceras y cors
 * @abstract
 * @author Jesus Juvinao
*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Allow', 'GET, POST');
  next();
});
const schema = (0, _schema.makeExecutableSchema)({
  typeDefs: _typeDefs.default,
  resolvers: _resolvers.default
});
const server = new _apolloServer.ApolloServer({
  schema,
  introspection: true,
  subscriptionsEndpoint: subscriptionsEndpoint,
  playground: {
    settings: {
      'editor.theme': 'dark'
    }
  },
  plugins: [(0, _apolloServerCore.ApolloServerPluginLandingPageGraphQLPlayground)()],
  context: async ({
    req,
    connection,
    res
  }) => {
    // const pubsub = new PubSub()
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      console.log(req.headers.authorization);
      const token = req.headers.authorization;

      if (token !== 'null') {
        try {
          //validate user in client.
          // const User = await jwt.verify(token, process.env.AUTHO_USER_KEY);
          let User = null;
          return {
            User,
            res
          };
        } catch (err) {
          console.log(err);
          console.log('Hola esto es un error del contexto');
        }
      }
    }
  }
});

_subscriptionsTransportWs.SubscriptionServer.create({
  schema,
  execute: _graphql.execute,
  subscribe: _graphql.subscribe
}, {
  server: httpServer,
  path: server.graphqlPath
}); // app.listen(4000, () => {
//     console.log('listening on port', port)
// })


app.set('graph-port', process.env.GRAPH_PORT || port);
server.listen({
  port: app.get('graph-port')
}).then(() => console.log(`listening on port ${app.get('graph-port')}`));