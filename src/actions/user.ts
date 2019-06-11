import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'
import { User } from '../types/user.js'
import { auth, provider } from '../firebase.js'
export const USER_LOADING = 'USER_LOADING'
export const UPDATE_USER = 'UPDATE_USER'
export const ERROR_USER = 'ERROR_USER'

export interface UserActionUpdateUser extends Action<'UPDATE_USER'> {
  user: User | null
}
export interface UserActionErrorUser extends Action<'ERROR_USER'> {
  error: string
}
export interface UserActionUserLoading extends Action<'USER_LOADING'> {
  loading: boolean
}
export type UserAction =
  | UserActionErrorUser
  | UserActionUpdateUser
  | UserActionUserLoading

type ThunkResult = ThunkAction<void, RootState, undefined, UserAction>

export const logOut: ActionCreator<ThunkResult> = () => dispatch => {
  dispatch(updateUser(null))
}

export const logIn: ActionCreator<ThunkResult> = () => dispatch => {
  dispatch(userLoading(true))
  auth()
    .signInWithPopup(provider)
    .then(({ user: rawUser }: any) => {
      const user: User = {
        email: rawUser.email,
        name: rawUser.displayName,
        photo: rawUser.photoURL,
      }

      dispatch(updateUser(user))
      dispatch(userLoading(false))
    })
    .catch((e: any) => {
      dispatch(userLoading(false))
      dispatch(errorUser('Error'))
    })
}

const userLoading: ActionCreator<UserActionUserLoading> = (
  loading: boolean,
) => {
  return {
    type: USER_LOADING,
    loading,
  }
}

const errorUser: ActionCreator<UserActionErrorUser> = (error: string) => {
  return {
    type: ERROR_USER,
    error,
  }
}

export const updateUser: ActionCreator<UserActionUpdateUser> = (
  user: User | null = null,
) => {
  return {
    type: UPDATE_USER,
    user,
  }
}
