interface Element {
  subjectShort: string
  subjectLong: string
  roomShort: string
  roomLong: string
  color: string
  klasseShort: string
}

interface Hour extends Array<Element> {}

interface Day extends Array<Hour> {}

export interface Week extends Array<Day> {
  timestamp?: number
}
