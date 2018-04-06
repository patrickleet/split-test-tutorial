import initStore from '../lib/initRedux'
import withRedux from 'next-redux-wrapper'
import { startExperiment } from '../lib/redux/reducers/experiments'
import headerTextExperiment from '../experiments/headerText'
import cookies from 'next-cookies'

const Index = ({experiments}) => (
  <div>
    { experiments.active[headerTextExperiment.name] === 'control' ? "Welcome to Next.js!" : null }
    { experiments.active[headerTextExperiment.name] === 'mine' ? "Welcome to MY Next.js!" : null }
  </div>
)
/* context: {req, res, query, isServer, store} */
Index.getInitialProps = (ctx) => {
  const { store } = ctx
  const dispatchStartExperiment = ({name, variant}) => {
    console.log('starting experiment')
    store.dispatch(startExperiment({
      name,
      variant
    }))
  }

  const activeExperiments = [
    headerTextExperiment
  ]

  headerTextExperiment.on('variant.selected', dispatchStartExperiment)

  let { userId } = cookies(ctx)
  activeExperiments.forEach((experiment) => {
    experiment.start({userId})
  })
}

const mapStateToProps = ({ experiments }) => ({
  experiments
})
const mapDispatchToProps = () => ({})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)