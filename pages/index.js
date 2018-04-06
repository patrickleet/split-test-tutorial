import { Component } from 'react'
import initStore from '../lib/initRedux'
import withRedux from 'next-redux-wrapper'
import { startExperiment } from '../lib/redux/reducers/experiments'
import headerTextExperiment from '../experiments/headerText'
import cookies from 'next-cookies'
import { track } from '../lib/analytics'

class Index extends Component {
  static getInitialProps (ctx) {
    /* ctx: {req, res, query, isServer, store} */
    const { store } = ctx
    const dispatchStartExperiment = ({name, variant}) => {
      store.dispatch(startExperiment({
        name,
        variant
      }))
    }

    const activeExperiments = [
      headerTextExperiment
    ]

    headerTextExperiment.once('variant.selected', dispatchStartExperiment)

    let { userId } = cookies(ctx)
    activeExperiments.forEach((experiment) => {
      experiment.start({userId})
    })
  }

  componentDidMount () {
    const { experiments } = this.props

    if (experiments.active[headerTextExperiment.name]) {
      // startExperiment just returns the redux action object
      // we can make use of this to look up the analytics
      // event name and value
      let analytics = startExperiment({
        name: headerTextExperiment.name,
        variant: experiments.active[headerTextExperiment.name]
      }).meta.analytics
      track({
        event: analytics.event,
        value: analytics.value
      })
    }
  }

  render () {
    const { experiments } = this.props
    return (
      <div>
        <Head>
          <title>SSR Split Tests</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <script dangerouslySetInnerHTML={{__html: ga}} />
          <script dangerouslySetInnerHTML={{__html: fb}} />
        </Head>
        { experiments.active[headerTextExperiment.name] === 'control' ? "Welcome to Next.js!" : null }
        { experiments.active[headerTextExperiment.name] === 'mine' ? "Welcome to MY Next.js!" : null }
      </div>
    )
  }
}

const mapStateToProps = ({ experiments }) => ({
  experiments
})
const mapDispatchToProps = () => ({})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
