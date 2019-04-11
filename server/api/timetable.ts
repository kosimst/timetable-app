import express from 'express'
import { fetchSource } from './middleware'

const router = express.Router()
require('events').EventEmitter.prototype._maxListeners = 100

router.get('/source/:source', async function(req, res) {
  const source = req.params.source
  const date = new Date(req.query.date || Date.now())

  res.send(await fetchSource(source, date))
})

module.exports = router
