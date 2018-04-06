import initStore from '../lib/initRedux'
import withRedux from 'next-redux-wrapper'

const Index = () => <div>Welcome to next.js!</div>

/* context: {req, res, query, isServer, store} */
Index.getInitialProps = ({store}) => {
  const dispatchStartExperiment = ({name, variant}) => {
    store.dispatch(startExperiment({
      name,
      variant
    }))
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = () => ({})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)