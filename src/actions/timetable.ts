import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'

import { Week } from '../types/timetable.js';

export const domain = 'timetable/'

export const CHANGE_MODE = 'timetable/CHANGE_MODE'
export const LOADING_TIMETABLE = 'timetable/LOADING_TIMETABLE'
export const UPDATE_SOURCE = 'timetable/UPDATE_SOURCE'
export const UPDATE_TIMETABLE = 'timetable/UPDATE_TIMETABLE'
export const UPDATE_ERROR = 'timetable/UPDATE_ERROR'
export const UPDATE_TIMESTAMP = 'timetable/UPDATE_TIMESTAMP'

export interface TimetableActionUpdateTimetable
  extends Action<'timetable/UPDATE_TIMETABLE'> {
  timetable: Week
}
export interface TimetableActionChangeMode
  extends Action<'timetable/CHANGE_MODE'> {
  mode: 'klasse' | 'teacher'
}
export interface TimetableActionLoadingTimetable
  extends Action<'timetable/LOADING_TIMETABLE'> {
  loading: boolean
}
export interface TimetableActionFetchTimetable
  extends Action<'timetable/FETCH_TIMETABLE'> {
  source: string
}

export interface TimetableActionUpdateError
  extends Action<'timetable/UPDATE_ERROR'> {
  error: string | null
}

export interface TimetableActionUpdateSource
  extends Action<'timetable/UPDATE_SOURCE'> {
  source: string
}

export interface TimetableActionUpdateTimestamp
  extends Action<'timetable/UPDATE_TIMESTAMP'> {
  timestamp: number
}

export type TimetableAction =
  | TimetableActionChangeMode
  | TimetableActionUpdateTimetable
  | TimetableActionFetchTimetable
  | TimetableActionUpdateError
  | TimetableActionUpdateSource
  | TimetableActionLoadingTimetable
  | TimetableActionUpdateTimestamp

type ThunkResult = ThunkAction<void, RootState, undefined, TimetableAction>

export const changeSource: ActionCreator<ThunkResult> = (
  source: string,
) => dispatch => {
  dispatch(loadTimetable(source))
}

export const loadTimetable: ActionCreator<ThunkResult> = (
  source: string,
) => async dispatch => {
  dispatch(loadingTimetable(true))

  fetch(`${location.origin}/api/timetable/${source}`)
    .then(res => {
      res.json().then((timetable: Week) => {
        dispatch(updateTimetable(timetable))
        dispatch(updateSource(source))
        dispatch(updateTimestamp(timetable.timestamp || Date.now()))
      })
    })
    .catch(e => {
      // TODO: Switch for different msg
      dispatch(updateError(e))
      dispatch(updateTimestamp(Date.now()))
    })
    .finally(() => {
      dispatch(loadingTimetable(false))
    })
}

const updateError: ActionCreator<TimetableActionUpdateError> = (
  error: string | null,
) => {
  return {
    type: UPDATE_ERROR,
    error,
  }
}

const loadingTimetable: ActionCreator<TimetableActionLoadingTimetable> = (
  loading: boolean,
) => {
  return {
    type: LOADING_TIMETABLE,
    loading,
  }
}

const updateTimetable: ActionCreator<TimetableActionUpdateTimetable> = (
  timetable: Week,
) => {
  return {
    type: UPDATE_TIMETABLE,
    timetable,
  }
}

const updateTimestamp: ActionCreator<TimetableActionUpdateTimestamp> = (
  timestamp: number,
) => {
  return {
    type: UPDATE_TIMESTAMP,
    timestamp,
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
