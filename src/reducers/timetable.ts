import { Reducer } from 'redux'
import {
  CHANGE_KLASSE,
  LOAD_KLASSE,
  UPDATE_KLASSE,
  UPDATE_TIMETABLE,
} from '../actions/timetable.js'
import { RootAction } from '../store.js'

export interface TimetableState {
  klasse: string
  timetable: any
}

const INITIAL_STATE: TimetableState = {
  klasse: '1A',
  timetable: {},
}

const timetable: Reducer<TimetableState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_KLASSE:
      return {
        ...state,
        klasse: action.klasse,
      }
    case UPDATE_TIMETABLE:
      return {
        ...state,
        timetable: action.timetable,
      }
    case LOAD_KLASSE:
      return {
        ...state,
        klasse: action.klasse,
      }
    case CHANGE_KLASSE:
      return {
        ...state,
        klasse: action.klasse
      }
    default:
      return state
  }
}

export default timetable
