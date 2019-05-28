import express from 'express'
import { fetchSource } from './middleware/fetchSource'
import { fetchSources } from './middleware/fetchSources'
import { fetchTeacher } from './middleware/fetchTeacher'

const router = express.Router()
require('events').EventEmitter.prototype._maxListeners = 100

router.get('/source/:source', async function(req, res) {
  const source = req.params.source
  const date = new Date(parseInt(req.query.date) || Date.now())

  if (parseInt(source[0]) == source[0]) {
    res.send(await fetchSource(source, date))
  } else {
    res.send(await fetchTeacher(source, date))
  }
})

router.get('/sources', async function(req, res) {
  const date = new Date(parseInt(req.query.date) || Date.now())

  res.send(await fetchSources(date))
})

router.get('/teacher/:teacher', async function(req, res) {
  const date = new Date(parseInt(req.query.date) || Date.now())
  const teacher = req.params.teacher

  res.send(await fetchTeacher(teacher, date))
})

export default router
