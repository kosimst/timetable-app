import fetch, { Headers } from 'node-fetch'

import db from '../api/database/api'
import { fetchSource } from '../api/middleware/fetchSource'
import { fetchSources } from '../api/middleware/fetchSources'
import { fetchTeachers } from '../api/middleware/fetchTeachers'
import { fetchTimes } from '../api/middleware/fetchSource'
import { getSession } from '../api/middleware/getSession'

import { Period } from '../interfaces/Period'

const flat = require('array.prototype.flat')
flat.shim()

export default async () => {
  /**
   * Update klassen timetables
   */
  console.info('Klassen update initiated')

  const sources = await fetchSources(new Date())

  const entries = Object.entries(sources)

  const tasks = Promise.all(
    entries.map(
      ([name, id]) =>
        new Promise((resolve, reject) => {
          fetchSource(id, new Date())
            .then(res => {
              if (res) {
                const timetable = res.timetable.map(day => {
                  const returnDay: any = {}

                  day.forEach((val, i) => {
                    returnDay[i] = val
                  })
                  return returnDay
                })
                db.collection('timetables')
                  .doc(name)
                  .set({
                    timestamp: res.timestamp,
                    timetable,
                  })
                  .then(() => {
                    resolve(res.timetable)
                  })
                  .catch(reject)
              }
            })
            .catch(reject)
        }),
    ),
  )

  tasks
    .then(async timetables => {
      console.info('Klassen updated successfully')

      const hours = timetables.flat(3)

      const periodUrls = hours.map(
        hour =>
          `https://thalia.webuntis.com/WebUntis/api/public/period/info?date=${
            hour.date
          }&starttime=${hour.startTime}&endtime=${hour.endTime}&elemid=${
            hour.id
          }&elemtype=1&ttFmtId=1&selectedPeriodId=${hour.lessonId}`,
      )

      const cookies = await getSession()
      if (cookies) {
        const headers = new Headers({
          Cookie: cookies,
        })

        const teachers: any = {}
        Promise.all(
          periodUrls.map(url =>
            fetch(url, { headers }).then(res => res.json()),
          ),
        ).then(async res => {
          res
            .map(period => {
              return period.data.blocks
            })
            .flat(2)
            .forEach(period => {
              const teachersInvolved = period.teacherNameLong.split(', ')

              teachersInvolved.forEach((teacher: string) => {
                if (teachers[teacher]) {
                  teachers[teacher].push(period)
                } else {
                  teachers[teacher] = [period]
                }
              })
            })

          const times = await fetchTimes()

          for (const [teacher, periods] of Object.entries(teachers)) {
            console.log(teacher)
            const timetable: Period[][][] = [[], [], [], [], []]

            // @ts-ignore
            for (const hour of periods) {
              const startTime = hour.periods[0].startTime
              const endTime = hour.periods[0].endTime

              const startHour =
                times.filter(({ startTime: hour }) => startTime === hour)[0]
                  .period - 1
              const endHour =
                times.filter(({ endTime: hour }) => endTime === hour)[0]
                  .period - 1
              const duration = endHour - startHour + 1

              const {
                // @ts-ignore
                groups: { day, month, year },
              } = /(?<year>[0-9]{4})(?<month>[0-9]{2})(?<day>[0-9]{2})/.exec(
                hour.periods[0].date,
              )

              const parsedDate = new Date(`${year}-${month}-${day}`)
              const weekDay = parsedDate.getDay() - 1

              timetable[weekDay][startHour] = [
                {
                  startHour,
                  endHour,
                  parsedDate,
                  duration,
                  roomShort: hour.periods[0].rooms.name || '',
                  roomLong: hour.periods[0].rooms.longName || '',
                  subjectShort: hour.subjectName || '',
                  subjectLong: hour.subjectNameLong || '',
                  klasseShort: hour.klasseName || '',
                  cancelled: hour.periods[0].isCancelled || false,
                },
              ]
            }

            const timetableParsed = timetable.map(day => {
              const returnDay: any = {}

              day.forEach((val, i) => {
                returnDay[i] = val
              })
              return returnDay
            })
            db.collection('timetables')
              .doc(teacher)
              .set({
                timestamp: Date.now(),
                timetableParsed,
              })
          }
        })
      }
    })
    .catch(() => {
      console.error('Klassen update failed')
    })
}
