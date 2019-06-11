declare global {
  interface Window {
    process?: Object
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  Reducer,
  StoreEnhancer,
} from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js'

import app, { AppState } from './reducers/app.js'
import { AppAction } from './actions/app.js'

import timetable, { TimetableState } from './reducers/timetable.js'
import { TimetableAction } from './actions/timetable.js'
import user, { UserState } from './reducers/user.js'
import { UserAction } from './actions/user.js';

// Overall state extends static states and partials lazy states.
export interface RootState {
  app?: AppState
  timetable?: TimetableState
  user?: UserState
}

export type RootAction = AppAction | TimetableAction | UserAction

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>,
  f2: StoreEnhancer<Ext1, StateExt1>,
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
  state => state as Reducer<RootState, RootAction>,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>),
  ),
)

// Initially loaded reducers.
store.addReducers({
  app,
  timetable,
  user
})
