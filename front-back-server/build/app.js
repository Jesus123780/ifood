"use strict";

var _apolloServerCore = require("apollo-server-core");

var _http = require("http");

var _graphql = require("graphql");

var _apolloServerExpress = require("apollo-server-express");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _schema = require("@graphql-tools/schema");

var _graphqlUpload = require("graphql-upload");

var _multer = _interopRequireDefault(require("multer"));

var _typeDefs = _interopRequireDefault(require("./api/lib/typeDefs"));

var _resolvers = _interopRequireDefault(require("./api/lib/resolvers"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _router = _interopRequireDefault(require("./api/lib/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
// @ts-ignore
(async () => {
  // config ports
  const GRAPHQL_PORT = 4000;
  const API_REST_PORT = 5000;
  const pubsub = new _graphqlSubscriptions.PubSub(); // Initialization apps

  const app = (0, _express.default)();
  app.set('port', process.env.GRAPHQL_PORT || 4000);
  app.post('/image', (req, res) => {
    res.json('/image api');
  });
  app.use('/image', (req, res) => {
    res.send('ONLINE PORT IMAGES!');
  }); // Listen App

  app.listen(API_REST_PORT, () => {
    console.log('API SERVER LISTENING ON PORT', API_REST_PORT);
  }); // Routes

  app.use('/static', _express.default.static('public')); // this folder for this application will be used to store public files

  app.use('/uploads', _express.default.static('uploads'));
  app.use('/api', _router.default); // Middleware

  app.use((0, _morgan.default)('dev'));
  app.use(_express.default.json({
    limit: '50mb'
  }));
  app.use((0, _graphqlUpload.graphqlUploadExpress)({
    maxFileSize: 1000000000,
    maxFiles: 10
  })); // const storage = multer.diskStorage({
  //     destination: path.join(__dirname, '../public'),
  //     filename: (req, file, next) => {
  //         next(null, new Date().getTime() + path.extname(file.originalname))
  //     }
  // })
  // Configure multer to accept a single file per post
  // const storage = multer.memoryStorage();
  // app.use(multer({
  //     storage,
  // }).single('file'));
  // app.use(multer({dest: path.join(__dirname, '../public/img/uploads')}).single('image'));

  const httpServer = (0, _http.createServer)(app);
  const schema = (0, _schema.makeExecutableSchema)({
    typeDefs: _typeDefs.default,
    resolvers: _resolvers.default
  });
  const server = new _apolloServerExpress.ApolloServer({
    // schema,
    typeDefs: _typeDefs.default,
    resolvers: _resolvers.default,
    introspection: true,
    plugins: [(0, _apolloServerCore.ApolloServerPluginLandingPageGraphQLPlayground)()],
    context: async ({
      req,
      res
    }) => {
      // check from req
      console.log('Run');
      const token = req.headers.authorization;

      if (token !== 'null') {
        try {
          //validate user in client.
          // const User = await jwt.verify(token, process.env.AUTHO_USER_KEY);
          let User = null;
          return {
            User,
            res,
            pubsub
          };
        } catch (err) {
          console.log(err);
          console.log('Hola esto es un error del contexto');
        }
      }
    }
  });
  await server.start();
  server.applyMiddleware({
    app
  });

  _subscriptionsTransportWs.SubscriptionServer.create({
    schema,
    execute: _graphql.execute,
    subscribe: _graphql.subscribe
  }, {
    server: httpServer,
    path: server.graphqlPath
  });

  httpServer.listen(GRAPHQL_PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${GRAPHQL_PORT}${server.graphqlPath}`);
  });
})();