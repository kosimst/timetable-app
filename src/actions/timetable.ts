import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'
export const CHANGE_KLASSE: string = 'CHANGE_KLASSE'
export const LOAD_KLASSE: string = 'LOAD_KLASSE'
export const UPDATE_KLASSE: string = 'UPDATE_KLASSE'
export const UPDATE_TIMETABLE: string = 'UPDATE_TIMETABLE'

export interface TimetableActionUpdateKlasse extends Action<'UPDATE_KLASSE'> {
  klasse: string
}
export interface TimetableActionChangeKlasse extends Action<'CHANGE_KLASSE'> {
  klasse: string
}
export interface TimetableActionLoadKlasse extends Action<'LOAD_KLASSE'> {
  klasse: string
}

// TODO: Create type for timetable data
export interface TimetableActionUpdateTimetable
  extends Action<'UPDATE_TIMETABLE'> {
  data: any
}
export type TimetableAction =
  | TimetableActionChangeKlasse
  | TimetableActionLoadKlasse
  | TimetableActionUpdateKlasse
  | TimetableActionUpdateTimetable

type ThunkResult = ThunkAction<void, RootState, undefined, TimetableAction>

export const changeKlasse: ActionCreator<ThunkResult> = (
  klasse: string,
) => dispatch => {
  dispatch(loadKlasse(klasse))
}

const loadKlasse: ActionCreator<ThunkResult> = (
  klasse: string,
) => async dispatch => {
  // Load klasse from API and update current timetable
  // Add to temp cache
  await fetch('https://api.ipify.org?format=json')
}

const updateTimetable: ActionCreator<TimetableActionUpdateTimetable> = (
  data: any,
) => {
  return {
    type: UPDATE_TIMETABLE,
    data,
  }
}
