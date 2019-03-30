interface Hour {
  subjectShort: string
}

interface Day extends Array<Hour> {}

export interface Week extends Array<Day> {
  timestamp?: number
}

