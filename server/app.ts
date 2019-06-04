import express from 'express'
// @ts-ignore
import secure from 'express-force-https'
const prpl = require('prpl-server')
const rendertron = require('rendertron-middleware')
const shrinkRay = require('shrink-ray')

const app = express()

/* Force https */
app.use(secure)

/* Use shrink ray */
app.use(shrinkRay())

/* Rendertron proxy for bots */
app.use(
  rendertron.makeMiddleware({
    proxyUrl: 'https://render-tron.appspot.com/render',
  }),
)

app.get(
  '/*',
  prpl.makeHandler('./build', {
    builds: [
      {
        name: 'default',
        browserCapabilities: ['es2015', 'push', 'modules', 'serviceworker'],
      },
      {
        name: 'default_prefetch',
        browserCapabilities: [],
      },
    ],
  }),
)

app.listen(process.env.PORT || 7000)
