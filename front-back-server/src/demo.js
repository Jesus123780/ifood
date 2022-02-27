'use strict'

import express from 'express'
import { ApolloServer } from 'apollo-server'
import typeDefs from './api/lib/typeDefs'
import resolvers from './api/lib/resolvers'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema }  from "@graphql-tools/schema"

// Init Server
const app = express()
const port = 4000
const subscriptionsEndpoint = `ws://localhost:${port}/subscriptions`;
// Init pubsub  

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
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header('Allow', 'GET, POST')
    next()
})

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({
    schema,
    introspection: true,
    subscriptionsEndpoint: subscriptionsEndpoint,
    playground: {
        settings: {
            'editor.theme': 'dark',
        }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],    
    context: async ({ req, connection, res }) => {
        // const pubsub = new PubSub()
        if (connection) {
            // check connection for metadata
            return connection.context;
        } else {
            // check from req
            console.log(req.headers.authorization)
            const token = (req.headers.authorization)
            if (token !== 'null') {
                try {
                    //validate user in client.
                    // const User = await jwt.verify(token, process.env.AUTHO_USER_KEY);
                    let User = null
                    return { User, res }
                } catch (err) {
                    console.log(err)
                    console.log('Hola esto es un error del contexto')
                }
            }

        }
    },
});

SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );
// app.listen(4000, () => {
//     console.log('listening on port', port)
// })
app.set('graph-port', process.env.GRAPH_PORT || port)




server.listen({ port: app.get('graph-port') }).then(() => console.log(`listening on port ${app.get('graph-port')}`))