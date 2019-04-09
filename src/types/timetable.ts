interface Element {
  subjectShort: string
  color: string
}

interface Hour extends Array<Element> {}

interface Day extends Array<Hour> {}

export interface Week extends Array<Day> {
  timestamp?: number
}
