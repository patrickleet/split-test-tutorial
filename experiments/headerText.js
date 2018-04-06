import Experiment from '../lib/Experiment'

const heroTextExperiment = new Experiment({
  name: 'Header Text',
  variants: {
    transform: {
      weight: 50,
      displayName: 'control'
    },
    superpowers: {
      weight: 50,
      displayName: 'mine'
    }
  }
})

export default headerTextExperiment
