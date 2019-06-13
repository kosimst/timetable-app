interface Element {
  cancelled: boolean
  duration: number
  endTime: number
  klasseShort: string
  parsedDate: {
    seconds: number
  }
  roomLong: string
  roomShort: string
  startTime: number
  studentGroups: string
  subjectLong: string
  subjectShort: string
  substitution: boolean
  teacherLong: string
  teacherShort: string
}

interface Hour extends Array<Element> {}

interface Day extends Array<Hour> {}

export interface Week extends Array<Day> {
  timestamp?: number
}
