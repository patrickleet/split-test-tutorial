import Experiment from '../lib/Experiment'

const headerTextExperiment = new Experiment({
  name: 'Header Text',
  variants: {
    control: {
      weight: 50,
      displayName: 'control'
    },
    mine: {
      weight: 50,
      displayName: 'mine'
    }
  }
})

export default headerTextExperiment
