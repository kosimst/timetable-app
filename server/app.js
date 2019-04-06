const express = require('express')
const prpl = require('prpl-server')
const rendertron = require('rendertron-middleware')

const app = express()

/* Redirect API calls to GraphQL */

/* Rendertron proxy for bots */
app.use(
  rendertron.makeMiddleware({
    proxyUrl: 'https://render-tron.appspot.com/render',
  }),
)

app.get('/api/*', (req, res) => {
  res.json([
    [
      {
        subjectShort: 'SP',
        subjectLong: 'Spanisch',
        teacherShort: 'SAE',
        roomShort: 'R4B',
        duration: 1,
        color: '#d35400',
      },
      {
        subjectShort: 'E',
        subjectLong: 'Mathematik',
        teacherShort: 'GUE',
        roomShort: 'R5A',
        duration: 1,
        color: '#2980b9',
      },
      {
        subjectShort: 'L',
        subjectLong: 'Deutsch',
        teacherShort: 'JAK',
        roomShort: 'R8E',
        duration: 1,
        color: '#d35400',
      },
      {
        subjectShort: 'D',
        subjectLong: 'Mathematik',
        teacherShort: 'JAK',
        roomShort: 'R3A',
        duration: 1,
        color: '#d35400',
      },
    ],
    [
      {
        subjectShort: 'SP',
        subjectLong: 'Latein',
        teacherShort: 'SAE',
        roomShort: 'R2C',
        duration: 1,
        color: '#16a085',
      },
      {
        subjectShort: 'M',
        subjectLong: 'Deutsch',
        teacherShort: 'FRI',
        roomShort: 'R1A',
        duration: 1,
        color: '#d35400',
      },
      {
        subjectShort: 'M',
        subjectLong: 'Spanisch',
        teacherShort: 'GUE',
        roomShort: 'R1B',
        duration: 2,
        color: '#f39c12',
      },
      {
        subjectShort: 'L',
        subjectLong: 'Spanisch',
        teacherShort: 'GUE',
        roomShort: 'R6D',
        duration: 2,
        color: '#27ae60',
      },
      {
        subjectShort: 'D',
        subjectLong: 'Mathematik',
        teacherShort: 'SAE',
        roomShort: 'R7A',
        duration: 1,
        color: '#d35400',
      },
    ],
    [
      {
        subjectShort: 'M',
        subjectLong: 'Deutsch',
        teacherShort: 'FRI',
        roomShort: 'R4D',
        duration: 2,
        color: '#d35400',
      },
      {
        subjectShort: 'L',
        subjectLong: 'Latein',
        teacherShort: 'SAE',
        roomShort: 'R5C',
        duration: 1,
        color: '#f39c12',
      },
      {
        subjectShort: 'E',
        subjectLong: 'Latein',
        teacherShort: 'GUE',
        roomShort: 'R5A',
        duration: 2,
        color: '#2980b9',
      },
      {
        subjectShort: 'SP',
        subjectLong: 'Spanisch',
        teacherShort: 'FRI',
        roomShort: 'R7D',
        duration: 1,
        color: '#16a085',
      },
      {
        subjectShort: 'M',
        subjectLong: 'Mathematik',
        teacherShort: 'JAK',
        roomShort: 'R2D',
        duration: 1,
        color: '#27ae60',
      },
      {
        subjectShort: 'SP',
        subjectLong: 'Englisch',
        teacherShort: 'SAE',
        roomShort: 'R5C',
        duration: 1,
        color: '#16a085',
      },
    ],
    [
      {
        subjectShort: 'E',
        subjectLong: 'Spanisch',
        teacherShort: 'FRI',
        roomShort: 'R4A',
        duration: 1,
        color: '#c0392b',
      },
      {
        subjectShort: 'E',
        subjectLong: 'Mathematik',
        teacherShort: 'PIN',
        roomShort: 'R4A',
        duration: 1,
        color: '#16a085',
      },
      {
        subjectShort: 'D',
        subjectLong: 'Deutsch',
        teacherShort: 'GUE',
        roomShort: 'R2A',
        duration: 1,
        color: '#c0392b',
      },
      {
        subjectShort: 'E',
        subjectLong: 'Deutsch',
        teacherShort: 'SAE',
        roomShort: 'R4D',
        duration: 1,
        color: '#27ae60',
      },
    ],
    [
      {
        subjectShort: 'E',
        subjectLong: 'Deutsch',
        teacherShort: 'JAK',
        roomShort: 'R6D',
        duration: 1,
        color: '#2980b9',
      },
      {
        subjectShort: 'SP',
        subjectLong: 'Deutsch',
        teacherShort: 'PIN',
        roomShort: 'R8E',
        duration: 1,
        color: '#27ae60',
      },
      {
        subjectShort: 'L',
        subjectLong: 'Deutsch',
        teacherShort: 'FRI',
        roomShort: 'R4B',
        duration: 1,
        color: '#2980b9',
      },
      {
        subjectShort: 'M',
        subjectLong: 'Englisch',
        teacherShort: 'GUE',
        roomShort: 'R1C',
        duration: 1,
        color: '#c0392b',
      },
      {
        subjectShort: 'M',
        subjectLong: 'Mathematik',
        teacherShort: 'FRI',
        roomShort: 'R3C',
        duration: 1,
        color: '#16a085',
      },
      {
        subjectShort: 'D',
        subjectLong: 'Deutsch',
        teacherShort: 'JAK',
        roomShort: 'R6C',
        duration: 1,
        color: '#16a085',
      },
    ],
  ])
})

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

app.listen(process.env.PORT || 3000)
