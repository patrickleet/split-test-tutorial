import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'

import reducers from './redux/reducers'

let reduxStore = null
// The following checks if the Redux DevTools extension 
// is available in your browser, and activates it if so.
// Otherwise, it executes a no-op function
let devtools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}
function create (initialState = {}) {
  return createStore(
    combineReducers({ // Setup reducers
      ...reducers
    }),
    initialState, // Hydrate the store with server-side data
    devtools
  )
}
export default function initStore (initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }
  
  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(initialState)
  }

  return reduxStore
}