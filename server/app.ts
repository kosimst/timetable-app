import express from 'express'
// @ts-ignore
import secure from 'express-force-https'
const rendertron = require('rendertron-middleware')
const path = require('path')

const app = express()

/* Force https */
app.use(secure)

/* Use static */
app.use(express.static(path.join(__dirname, '../build')))

/* Rendertron proxy for bots */
app.use(
  rendertron.makeMiddleware({
    proxyUrl: 'https://render-tron.appspot.com/render',
  }),
)

/* SPA */
app.get(
  '/*',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../build/default/index.html'))
  }
)

app.listen(process.env.PORT || 7000)
