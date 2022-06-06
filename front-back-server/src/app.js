/* eslint-disable no-console */
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { createServer } from 'node:http'
import { execute, subscribe } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlUploadExpress } from 'graphql-upload'
import subscriptionHandler from '../src/api/lib/router/subscriptionHandler'
import jwt from 'jsonwebtoken'
import cors from 'cors'
// @ts-ignore

import typeDefs from './api/lib/typeDefs'
import resolvers from './api/lib/resolvers'
import express from 'express'
import morgan from 'morgan'
import indexRoutes from './api/lib/router'
var cookieParser = require('cookie-parser')
// const webpush = require('web-push')
function parseCookies(request) {
    const list = {}
    const cookieHeader = request.headers?.cookie
    if (!cookieHeader) return list

    cookieHeader.split(';').forEach(function (cookie) {
        let [name, ...rest] = cookie.split('=')
        name = name?.trim()
        if (!name) return
        const value = rest.join('=').trim()
        if (!value) return
        list[name] = decodeURIComponent(value)
    })

    return list
}

(async () => {
    // config ports
    const GRAPHQL_PORT = 4000
    const API_REST_PORT = 5000
    const pubsub = new PubSub()

    // Initialization apps
    const app = express()
    app.use(cookieParser())
    // const whitelist = ['http://localhost:3001', 'http://localhost:4000']
    const CORS_ORIGIN = 'http://localhost:3001'

    // eslint-disable-next-line
    const corsOptions = {
        credentials: true, // This is important.
        origin: (origin, callback) => {
            const whitelist = CORS_ORIGIN ? CORS_ORIGIN.split(',') : []
            if (whitelist.includes(origin))
            // return callback(null, true)

                callback(null, whitelist.includes(origin))

            callback(new Error('Not allowed by CORS'))
        },
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors())
    // app.use(
    //     cors({
    //         origin(origin, cb) {
    //             const whitelist = CORS_ORIGIN ? CORS_ORIGIN.split(',') : []
    //             cb(null, whitelist.includes(origin))
    //         },
    //         credentials: true
    //     })
    // )
    app.set('port', process.env.GRAPHQL_PORT || 4000)

    app.post('/image', (req, res) => { res.json('/image api') })

    app.use('/image', (req, res) => {
        res.send('ONLINE PORT IMAGES!')
    })
    // Listen App
    app.listen(API_REST_PORT, () => {
        console.log('API SERVER LISTENING ON PORT', API_REST_PORT)
    })
    // Routes
    app.use('/static', express.static('public'))
    // this folder for this application will be used to store public files
    app.use('/uploads', express.static('uploads'))

    app.use('/api', indexRoutes)

    app.post('/subscription2', subscriptionHandler.handlePushNotificationSubscription)
    app.get('/subscription2/:id', subscriptionHandler.sendPushNotification)
    // Middleware
    app.use(morgan('dev'))
    app.use(express.json({ limit: '50mb' }))
    app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }))
    const httpServer = createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const server = new ApolloServer({
        // schema,
        typeDefs, resolvers,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        context: async ({ req, res }) => {
            try {
                // check from req
                const token = (req.headers.authorization?.split(' ')[1])
                // const cookies = req
                // res.setCookie('my-new-cookie', 'Hi There')
                const cookies = parseCookies(req)
                console.log(cookies, 0)

                const restaurant = req.headers.restaurant || {}
                if (token !== 'null') {
                    try {
                        //validate user in client.
                        const User = await jwt.verify(token, '12ba105efUaGjihGrh0LfJHTGIBGu6jXV')
                        // let User = null
                        return { User, res, pubsub, restaurant: restaurant || {} }
                    } catch (err) {
                        console.log(err)
                        console.log('Hola esto es un error del contexto')
                    }
                } else { return { restaurant: restaurant || {} } }

            } catch (error) {
                console.log(error, 'finalERROR')
            }


        }
    })
    await server.start()
    server.applyMiddleware({ app })
    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    )

    httpServer.listen(process.env.PORT || 4000, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${process.env.PORT}`
        )
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${GRAPHQL_PORT}${server.graphqlPath}`
        )
    })
})()
