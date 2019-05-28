const express = require('express')
const prpl = require('prpl-server')
const rendertron = require('rendertron-middleware')
const secure = require('express-force-https')

const app = express()

const timetable = require('./api/timetable');

require('./services/updateTimetables')

/* Force https */
app.use(secure)

/* Redirect API calls to GraphQL */

/* Rendertron proxy for bots */
app.use(
  rendertron.makeMiddleware({
    proxyUrl: 'https://render-tron.appspot.com/render',
  }),
)

app.use('/api/timetable', timetable)

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
