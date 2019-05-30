import express from 'express'
// @ts-ignore
import secure from 'express-force-https'
const prpl = require('prpl-server')
const rendertron = require('rendertron-middleware')

const app = express()

/* Force https */
app.use(secure)

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
        name: 'esm-unbundled',
        browserCapabilities: ['push', 'es2018', 'modules'],
      },
      {
        name: 'esm-bundled',
        browserCapabilities: ['es2018', 'modules'],
      },
      {
        name: 'es6-bundled',
        browserCapabilities: ['es2015'],
      },
      {
        name: 'es5-bundled',
        browserCapabilities: [],
      },
    ],
  }),
)

app.listen(process.env.PORT || 7000)
