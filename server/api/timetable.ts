import fetch from 'node-fetch'
import express from 'express'

const router = express.Router()
require('events').EventEmitter.prototype._maxListeners = 100

router.get('/source/:source', function(req, response) {
  const klasse = req.params.source
  const date = new Date(req.query.date || Date.now())
  const options = {
    url: 'https://thalia.webuntis.com/WebUntis/j_spring_security_check',
    form: {
      login_url: '/login.do',
      school: 'ahs-korneuburg',
    },
  }

  const url = `https://thalia.webuntis.com/WebUntis/api/public/timetable/weekly/data?elementType=1&elementId=${klasse}&date=${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}&formatId=1`
  console.log(url)
  request.post(options, (error: any, res: any) => {
    if (error) {
      console.log(error)
    }
    if (!error) {
      const name = res.headers['set-cookie'][1]
      const id = res.headers['set-cookie'][0]
      const options = {
        url,
        headers: {
          Cookie: name + '; ' + id,
        },
      }
      request(options, function(err: any, resp: any, body: any) {
        response.send(body)
        if (err) {
          console.log(err)
        }
      })
    }
  })
})

module.exports = router
