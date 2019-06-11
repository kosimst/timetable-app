import { Reducer } from 'redux'
import { ERROR_USER, UPDATE_USER, /* USER_LOADING */ } from '../actions/user.js'
import { RootAction } from '../store.js'
import { User } from '../types/user.js'

export interface UserState {
  loading: boolean
  user: User | null
  logged_in: boolean
  error: string | null
}

const INITIAL_STATE: UserState = {
  loading: false,
  user: null,
  logged_in: false,
  error: null,
}

const user: Reducer<UserState, RootAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case ERROR_USER:
      return {
        ...state,
        error: action.error,
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      }
    case ERROR_USER:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default user
