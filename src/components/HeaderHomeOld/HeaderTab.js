import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import { appIsLoading, updateScrollPosition } from '../../store/app'
import lang from '../../lib/utils/Lang'

class HeaderTab extends Component {

  constructor (props) {
    super(props)
    this._savePosition = this._savePosition.bind(this)
  }

  static propTypes = {
    appIsLoading: React.PropTypes.func,
    activeTab: React.PropTypes.string,
    headerState: React.PropTypes.string,
    userIsLoggedIn: React.PropTypes.bool,
    scrollHistory: React.PropTypes.object,
    updateScrollPosition: React.PropTypes.func,
    checkActiveScroll: React.PropTypes.func,
    lang: React.PropTypes.string
  }

  state = {
    activeTab: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount () {
    this.setState({
      activeTab: this.props.activeTab
    })
  }

  _savePosition (val, query = null) {
    const { router } = this.context
    const currentKey = this.props.activeTab
    // get scrolled position
    const scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop
    // update scroll history
    let updateState = {}
    const currentState = this.props.scrollHistory
    // check available
    if (currentState) {
      // update state
      updateState = Object.assign({}, currentState, { [currentKey]: { point: scrollPosition } })
    } else {
      updateState[currentKey] = { point: scrollPosition }
    }
    // update to store
    this.props.updateScrollPosition(updateState)
    // push location state
    const queries = query && query
    router.push({
      pathname: val,
      query: queries
    })
  }

  render () {
    const homeCN = this.props.activeTab === 'home'
    const hlCN = this.props.activeTab === 'hotlist'
    const wlCN = this.props.activeTab === 'wishlist'
    const feedCN = this.props.activeTab === 'feed'
    const fvCN = this.props.activeTab === 'favorite'

    return (
      <Tabs userIsLoggedIn={this.props.userIsLoggedIn}
        stateTab={this.state.activeTab}
        headerState={this.props.headerState}
        checkActiveScroll={this.checkActiveScroll}>
        <Tab isActive={homeCN} label='Home' onClick={() => this._savePosition('/', { h: 3 })} />
        {
          this.props.userIsLoggedIn
          ? <Tab label='Feed' isActive={feedCN} onClick={() => this._savePosition('/feed')} />
          : ''
        }
        {
          this.props.userIsLoggedIn
          ? <Tab label='Wishlist' isActive={wlCN} onClick={() => this._savePosition('/wishlist')} />
          : ''
        }
        <Tab isActive={hlCN} label='Hot List' onClick={() => this._savePosition('/hot')} />
        {
          this.props.userIsLoggedIn
          ? <Tab label={lang[this.props.lang]['Favorite tab']} isActive={fvCN}
            onClick={() => this._savePosition('/fave')} />
          : ''
        }
      </Tabs>
    )
  }
}

const mapDispatchToProps = {
  appIsLoading,
  updateScrollPosition
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderTab)
