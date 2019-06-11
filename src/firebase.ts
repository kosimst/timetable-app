// @ts-ignore
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

/**
 * Set up firebase
 */
firebase.initializeApp({
  apiKey: 'AIzaSyDDA8PrngKJy5GGWp8fgekkZl_w7cW_2LQ',
  authDomain: 'timetable-kosimst.firebaseapp.com',
  databaseURL: 'https://timetable-kosimst.firebaseio.com',
  projectId: 'timetable-kosimst',
  storageBucket: 'timetable-kosimst.appspot.com',
  messagingSenderId: '227541926253',
  appId: '1:227541926253:web:c0d0a6e50aadd8b2',
})
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
})
firebase.firestore().enablePersistence()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('profile')

export const firestore = firebase.firestore()
export const auth = firebase.auth
export { provider }
