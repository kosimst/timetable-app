import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const UPDATE_LOADING = 'UPDATE_LOADING'
export const TOGGLE_LOGIN_DIALOG = 'TOGGLE_LOGIN_DIALOG'

export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {
  page: string
}
export interface AppActionUpdateOffline extends Action<'UPDATE_OFFLINE'> {
  offline: boolean
}
export interface AppActionUpdateDrawerState
  extends Action<'UPDATE_DRAWER_STATE'> {
  opened: boolean
}
export interface AppActionUpdateLoading extends Action<'UPDATE_LOADING'> {
  loading: boolean
}

export interface AppActionToggleLoginDialog
  extends Action<'TOGGLE_LOGIN_DIALOG'> {
  loginDialogOpened: boolean
}
export interface AppActionUpdateTitle extends Action<'UPDATE_TITLE'> {
  title: string
}
export interface AppActionOpenSnackbar extends Action<'OPEN_SNACKBAR'> {}
export interface AppActionCloseSnackbar extends Action<'CLOSE_SNACKBAR'> {}
export type AppAction =
  | AppActionUpdatePage
  | AppActionUpdateOffline
  | AppActionUpdateDrawerState
  | AppActionOpenSnackbar
  | AppActionCloseSnackbar
  | AppActionUpdateTitle
  | AppActionUpdateLoading
  | AppActionToggleLoginDialog

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>

export const navigate: ActionCreator<ThunkResult> = (
  path: string,
) => dispatch => {
  // Extract the page name from path.
  const page = path === '/' ? 'main' : path.slice(1)

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page))

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false))
}

const loadPage: ActionCreator<ThunkResult> = (page: string) => dispatch => {
  dispatch(updateTitle('Mein Stundenplan: Seite wird geladen...'))
  dispatch(updateLoading(true))
  !(() =>
    new Promise(
      async (resolve: ({ title }: { title: string }) => void, reject) => {
        switch (page) {
          case 'main':
            import('../components/views/view-main.js')
              .then(resolve)
              .catch(reject)
            break
          case 'timetable':
            import('../components/views/view-timetable.js')
              .then(resolve)
              .catch(reject)
            break
          default:
            page = 'notfound'
            import('../components/views/view-notfound.js')
              .then(resolve)
              .catch(reject)
            break
        }
      },
    ))()
    .then(({ title }: { title: string }) => {
      dispatch(updateTitle(title))
      dispatch(updateLoading(false))
      dispatch(updatePage(page))
    })
    .catch((e: Error) => {
      console.error(`Failed to load page '${page}':`, e)
    })
}

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page,
  }
}

const updateLoading: ActionCreator<AppActionUpdateLoading> = (
  loading: boolean,
) => {
  return {
    type: UPDATE_LOADING,
    loading,
  }
}

const updateTitle: ActionCreator<AppActionUpdateTitle> = (title: string) => {
  return {
    type: UPDATE_TITLE,
    title,
  }
}

let snackbarTimer: number

export const showSnackbar: ActionCreator<ThunkResult> = () => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR,
  })
  window.clearTimeout(snackbarTimer)
  snackbarTimer = window.setTimeout(
    () => dispatch({ type: CLOSE_SNACKBAR }),
    3000,
  )
}

export const updateOffline: ActionCreator<ThunkResult> = (offline: boolean) => (
  dispatch,
  getState,
) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app!.offline) {
    dispatch(showSnackbar())
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline,
  })
}

export const updateDrawerState: ActionCreator<AppActionUpdateDrawerState> = (
  opened: boolean,
) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened,
  }
}

export const toggleLoginDialog: ActionCreator<AppActionToggleLoginDialog> = (
  loginDialogOpened: boolean,
) => {
  return {
    type: TOGGLE_LOGIN_DIALOG,
    loginDialogOpened,
  }
}
