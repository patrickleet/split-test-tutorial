import initStore from '../lib/initRedux'
import withRedux from 'next-redux-wrapper'

const Index = () => <div>Welcome to next.js!</div>

const mapStateToProps = () => ({})
const mapDispatchToProps = () => ({})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)