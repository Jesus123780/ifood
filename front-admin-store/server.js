const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { join, resolve } = require('path')
const port = parseInt(process.env.PORT) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const LRUCache = require('lru-cache')
const { readFileSync } = require('fs')

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      const rootStaticFiles = [
        '/favicon.ico',
        '/horario.svg',
      ]
      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        const path = join(__dirname, 'public', parsedUrl.pathname)
        app.serveStatic(req, res, path)
      } else {
        if (pathname === '/a') {
          app.render(req, res, '/b', query)
        } else if (pathname === '/b') {
          app.render(req, res, '/a', query)
        } else {
          handle(req, res, parsedUrl)
        }
      }
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })