import { Reducer } from 'redux'
import {
  UPDATE_TIMETABLE,
  CHANGE_MODE,
  UPDATE_SOURCE,
  UPDATE_TIMESTAMP,
  UPDATE_SOURCES,
  UPDATE_COLORS
} from '../actions/timetable.js'
import { RootAction } from '../store.js'
import { Week } from '../types/timetable.js'

export interface TimetableState {
  sources: {
    [short: string]: string | number
  }
  mode: 'klassen' | 'teacher'
  source: string
  timetable: Week
  timestamp: number
  colors: {
    [subject: string]: string
  }
}

const INITIAL_STATE: TimetableState = {
  mode: 'klassen',
  source: '1A',
  timetable: [],
  timestamp: 0,
  sources: {},
  colors: { default: '#1155ff' },
}

const timetable: Reducer<TimetableState, RootAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case UPDATE_SOURCE:
      return {
        ...state,
        source: action.source,
      }
    case UPDATE_TIMETABLE:
      return {
        ...state,
        timetable: action.timetable,
      }
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.mode,
      }
    case UPDATE_TIMESTAMP:
      return {
        ...state,
        timestamp: action.timestamp,
      }
    case UPDATE_SOURCES:
      return {
        ...state,
        sources: action.sources,
      }
    case UPDATE_COLORS:
      return {
        ...state,
        colors: action.colors,
      }
    default:
      return state
  }
}

export default timetable
