// @ts-check
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql'
import { ApolloServer, gql } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlUploadExpress, graphqlUploadKoa } from 'graphql-upload';
import multer from 'multer';
// @ts-ignore
import typeDefs from './api/lib/typeDefs'
import resolvers from './api/lib/resolvers'
import express from 'express'
import path from 'path'

(async () => {
    const PORT = 4000;
    const pubsub = new PubSub();
    const app = express();
    app.post('/image', (req, res) => {
        res.json('/image api');
    });
    app.use('/static', express.static('public'))
    // @ts-ignore
    app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
    // const storage = multer.diskStorage({
    //     destination: path.join(__dirname, '../public'),
    //     filename: (req, file, next) => {
    //         next(null, new Date().getTime() + path.extname(file.originalname))
    //     }
    // })
    // app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const server = new ApolloServer({
        // schema,
        typeDefs, resolvers,
        introspection: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: async ({ req, res }) => {
            // check from req
            console.log('Run')
            const token = (req.headers.authorization)
            if (token !== 'null') {
                try {
                    //validate user in client.
                    // const User = await jwt.verify(token, process.env.AUTHO_USER_KEY);
                    let User = null
                    return { User, res, pubsub }
                } catch (err) {
                    console.log(err)
                    console.log('Hola esto es un error del contexto')
                }
            }

        },
    });
    await server.start();
    server.applyMiddleware({ app });
    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    );

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
        );
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        );
    });


})();
