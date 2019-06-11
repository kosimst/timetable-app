import { Reducer } from 'redux'
import {
  UPDATE_PAGE,
  UPDATE_OFFLINE,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  UPDATE_DRAWER_STATE,
  UPDATE_TITLE,
  UPDATE_LOADING,
  TOGGLE_LOGIN_DIALOG,
} from '../actions/app.js'
import { RootAction } from '../store.js'

export interface AppState {
  page: string
  offline: boolean
  drawerOpened: boolean
  snackbarOpened: boolean
  title: string
  loading: boolean
  loginDialogOpened: boolean
}

const INITIAL_STATE: AppState = {
  page: '',
  offline: false,
  drawerOpened: false,
  snackbarOpened: false,
  title: 'Mein Stundenplan',
  loading: true,
  loginDialogOpened: false,
}

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
      }
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline,
      }
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened,
      }
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true,
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false,
      }
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      }
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case TOGGLE_LOGIN_DIALOG:
      return {
        ...state,
        loginDialogOpened: action.loginDialogOpened,
      }
    default:
      return state
  }
}

export default app
