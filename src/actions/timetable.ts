import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'
export const CHANGE_KLASSE = 'CHANGE_KLASSE'
export const LOAD_KLASSE = 'LOAD_KLASSE'
export const UPDATE_KLASSE = 'UPDATE_KLASSE'
export const UPDATE_TIMETABLE = 'UPDATE_TIMETABLE'
export const UPDATE_MODE = 'UPDATE_MODE'

export interface TimetableActionUpdateKlasse extends Action<'UPDATE_KLASSE'> {
  klasse: string
}
export interface TimetableActionChangeKlasse extends Action<'CHANGE_KLASSE'> {
  klasse: string
}
export interface TimetableActionLoadKlasse extends Action<'LOAD_KLASSE'> {
  klasse: string
}
export interface TimetableActionUpdateMode extends Action<'UPDATE_MODE'> {
  mode: 'klasse' | 'teacher'
}

// TODO: Create type for timetable data
export interface TimetableActionUpdateTimetable
  extends Action<'UPDATE_TIMETABLE'> {
  timetable: any
}
export type TimetableAction =
  | TimetableActionChangeKlasse
  | TimetableActionLoadKlasse
  | TimetableActionUpdateKlasse
  | TimetableActionUpdateTimetable
  | TimetableActionUpdateMode

type ThunkResult = ThunkAction<void, RootState, undefined, TimetableAction>

export const changeKlasse: ActionCreator<ThunkResult> = (
  klasse: string,
) => dispatch => {
  dispatch(loadKlasse(klasse))
}

const loadKlasse: ActionCreator<ThunkResult> = (
  klasse: string,
) => async dispatch => {
  dispatch(updateTimetable(await fetch('https://api.ipify.org?format=json')))
  dispatch(updateKlasse(klasse))
}

const updateTimetable: ActionCreator<TimetableActionUpdateTimetable> = (
  timetable: any,
) => {
  return {
    type: UPDATE_TIMETABLE,
    timetable,
  }
}

const updateKlasse: ActionCreator<TimetableActionUpdateKlasse> = (
  klasse: string,
) => {
  return {
    type: UPDATE_KLASSE,
    klasse,
  }
}

export const updateMode: ActionCreator<ThunkResult> = (mode: string) => (
  dispatch,
  getState,
) => {
  switch (mode) {
    case 'klasse': {
      const { timetable: klasse } = getState()
      dispatch(loadKlasse(klasse))
      break
    }
    case 'teacher': {
    }
  }
}
