import { Reducer } from 'redux'
import {
  UPDATE_TIMETABLE,
  CHANGE_MODE,
  UPDATE_SOURCE,
  UPDATE_TIMESTAMP,
} from '../actions/timetable.js'
import { RootAction } from '../store.js'

export interface TimetableState {
  mode: 'klasse' | 'teacher'
  source: string
  timetable: any
  timestamp: number
}

const INITIAL_STATE: TimetableState = {
  mode: 'klasse',
  source: '1A',
  timetable: {},
  timestamp: 0,
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
    default:
      return state
  }
}

export default timetable
