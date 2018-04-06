export default (state = {
  active: {}
}, { type, payload }) => {
  switch (type) {
    case 'START_EXPERIMENT':
      let { name, variant } = payload
      let active = Object.assign({}, state.active)
      active[name] = variant
      return {
        active
      }
    default:
      return state
  }
}

export function startExperiment ({name, variant}) {
  return {
    type: 'START_EXPERIMENT',
    payload: {
      name,
      variant
    },
    meta: {
      analytics: {
        event: `${name} Experiment Played`,
        value: variant
      }
    }
  }
}
