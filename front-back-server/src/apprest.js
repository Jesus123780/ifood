'use strict'

import express from 'express'
import morgan from 'morgan'
import BodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Init Server
const app = express()
const port = 5000
// config port 
app.set('port', process.env.PORT || port)
// Middleware
app.use(morgan('dev'))
app.use(BodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET_KEY || 'B2EE2E811317D6AAF902646FED7A72A2'))
// config static files
app.use('/static', express.static('public'))

// Accept all origins
const corsOptions = {
    origin: (_origin, callback) => callback(null, true),
    credentials: true
}
app.use(BodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))
app.use('/', (req, res) => {
    res.send('food!')
})

app.listen(port, () => {
    console.log(
        `🚀 endpoint ready at http://localhost:${port}`
    );
});