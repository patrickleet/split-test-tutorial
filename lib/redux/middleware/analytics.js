import { track } from '../../analytics'

export default ({ dispatch, getState }) => next => action => {
  const {
    analytics
  } = action.meta || {}

  next(action)

  if (analytics) {
    track(analytics)
  }
}
