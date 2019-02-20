const express = require('express')
const prpl = require('prpl-server')
const rendertron = require('rendertron-middleware')

const app = express()

/* Redirect API calls to GraphQL */

/* Rendertron proxy for bots */
app.use(rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render'
}))

app.get('/*', prpl.makeHandler('./build'))

app.listen(process.env.PORT || 3000)