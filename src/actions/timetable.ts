import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'
export const CHANGE_MODE = 'CHANGE_MODE'
export const CHANGE_SOURCE = 'CHANGE_SOURCE'
export const FETCH_TIMETABLE = 'FETCH_TIMETABLE'
export const REJECT_TIMETABLE = 'FETCH_TIMETABLE'
export const UPDATE_SOURCE = 'UPDATE_SOURCE'
export const UPDATE_TIMETABLE = 'UPDATE_TIMETABLE'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP'

export interface TimetableActionChangeSource extends Action<'CHANGE_SOURCE'> {
  source: string
}
export interface TimetableActionUpdateTimetable
  extends Action<'UPDATE_TIMETABLE'> {
  timetable: any
}
export interface TimetableActionChangeMode extends Action<'CHANGE_MODE'> {
  mode: 'klasse' | 'teacher'
}
export interface TimetableActionFetchTimetable
  extends Action<'FETCH_TIMETABLE'> {
  source: string
}

export interface TimetableActionRejectTimetable
  extends Action<'REJECT_TIMETABLE'> {
  error: string
}

export interface TimetableActionUpdateSource extends Action<'UPDATE_SOURCE'> {
  source: string
}

export type TimetableAction =
  | TimetableActionChangeMode
  | TimetableActionUpdateTimetable
  | TimetableActionChangeSource
  | TimetableActionFetchTimetable
  | TimetableActionRejectTimetable
  | TimetableActionUpdateSource

type ThunkResult = ThunkAction<void, RootState, undefined, TimetableAction>

export const changeSource: ActionCreator<ThunkResult> = (
  source: string,
) => dispatch => {
  dispatch(fetchTimetable(source))
}

const fetchTimetable: ActionCreator<ThunkResult> = (
  source: string,
) => async dispatch => {
  // TODO: Handle error and dispatch error msg
  dispatch(updateTimetable(await fetch('https://api.ipify.org?format=json')))
  dispatch(updateSource(source))
}

const updateTimetable: ActionCreator<TimetableActionUpdateTimetable> = (
  timetable: any,
) => {
  return {
    type: UPDATE_TIMETABLE,
    timetable,
  }
}

const updateSource: ActionCreator<TimetableActionUpdateSource> = (
  source: string,
) => {
  return {
    type: UPDATE_SOURCE,
    source,
  }
}

export const changeMode: ActionCreator<TimetableActionChangeMode> = (
  mode: 'klasse' | 'teacher',
) => {
  return {
    mode,
    type: CHANGE_MODE,
  }
}
