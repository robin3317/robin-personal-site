const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handler(req, res)
    })

    server.use(handler).listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })