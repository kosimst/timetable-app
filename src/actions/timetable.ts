import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { RootState } from '../store.js'
import db from '../firestore.js'

import { Week } from '../types/timetable.js'

export const domain = 'timetable/'

export const CHANGE_MODE = 'timetable/CHANGE_MODE'
export const LOADING_TIMETABLE = 'timetable/LOADING_TIMETABLE'
export const UPDATE_SOURCE = 'timetable/UPDATE_SOURCE'
export const UPDATE_TIMETABLE = 'timetable/UPDATE_TIMETABLE'
export const UPDATE_ERROR = 'timetable/UPDATE_ERROR'
export const UPDATE_TIMESTAMP = 'timetable/UPDATE_TIMESTAMP'
export const UPDATE_SOURCES = 'timetable/UPDATE_SOURCES'
export const UPDATE_COLORS = 'timetable/UPDATE_COLORS'

export interface TimetableActionUpdateTimetable
  extends Action<'timetable/UPDATE_TIMETABLE'> {
  timetable: Week
}
export interface TimetableActionChangeMode
  extends Action<'timetable/CHANGE_MODE'> {
  mode: 'klassen' | 'teacher'
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

export interface TimetableActionUpdateSources
  extends Action<'timetable/UPDATE_SOURCES'> {
  sources: {
    [short: string]: string | number
  }
}

export interface TimetableActionUpdateColors
  extends Action<'timetable/UPDATE_COLORS'> {
  colors: {
    [subject: string]: string
  }
}

export type TimetableAction =
  | TimetableActionChangeMode
  | TimetableActionUpdateTimetable
  | TimetableActionFetchTimetable
  | TimetableActionUpdateError
  | TimetableActionUpdateSource
  | TimetableActionLoadingTimetable
  | TimetableActionUpdateTimestamp
  | TimetableActionUpdateSources
  | TimetableActionUpdateColors

type ThunkResult = ThunkAction<void, RootState, undefined, TimetableAction>

export const changeSource: ActionCreator<ThunkResult> = (
  source: string,
) => dispatch => {
  dispatch(loadTimetable(source))
}

export const updateSources: ActionCreator<ThunkResult> = (
  mode: 'klassen' | 'teacher',
) => async dispatch => {
  const sources = (await db
    .collection('sources')
    .doc(mode)
    .get()).data()

  dispatch({ sources, type: 'timetable/UPDATE_SOURCES' })
  dispatch(changeMode(mode))
}

export const loadTimetable: ActionCreator<ThunkResult> = (
  source: string,
) => async dispatch => {
  dispatch(updateSource(source))
  dispatch(loadingTimetable(true))

  const {
    timetable,
    timestamp,
  }: { timestamp: number; timetable: any } = (await db
    .collection('timetables')
    .doc(source)
    .get()).data()

  dispatch(updateTimestamp(timestamp || Date.now()))

  const parsedTimetable: any = [[], [], [], [], []]
  timetable.forEach((day: any, i: number) => {
    for (const [h, hour] of Object.entries(day)) {
      parsedTimetable[i][parseInt(h)] = hour
    }
  })

  dispatch(updateTimetable(parsedTimetable))
  dispatch(loadingTimetable(false))
}

export const updateColors: ActionCreator<
  ThunkResult
> = () => async dispatch => {
  const colors = (await db
    .collection('config')
    .doc('subject-colors')
    .get()).data()
  dispatch({
    type: UPDATE_COLORS,
    colors,
  })
}

/* const updateError: ActionCreator<TimetableActionUpdateError> = (
  error: string | null,
) => {
  return {
    type: UPDATE_ERROR,
    error,
  }
} */

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

const changeMode: ActionCreator<TimetableActionChangeMode> = (
  mode: 'klassen' | 'teacher',
) => {
  return {
    mode,
    type: CHANGE_MODE,
  }
}
