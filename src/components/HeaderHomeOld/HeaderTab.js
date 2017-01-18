import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import { appIsLoading, updateScrollPosition } from '../../store/app'
import { HOSTNAME } from '../../constants'

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
    checkActiveScroll: React.PropTypes.func
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
    let currentKey = this.props.activeTab
    // get scrolled position
    let scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop
    // update scroll history
    let updateState = {}
    let currentState = this.props.scrollHistory
    // check available
    if (currentState) {
      // update state
      currentState[currentKey] = { point: scrollPosition }
      updateState = currentState
    } else {
      updateState[currentKey] = { point: scrollPosition }
    }
    // update to store
    this.props.updateScrollPosition(updateState)
    // push location state
    let queries = query && query
    router.push({
      pathname: val,
      query: queries
    })
  }

  render () {
    const homeCN = this.props.activeTab === 'home'
    const hlCN = this.props.activeTab === 'hotlist'
    const flCN = this.props.activeTab === 'favorite'
    const wlCN = this.props.activeTab === 'wishlist'

    return (
      <Tabs userIsLoggedIn={this.props.userIsLoggedIn}
        stateTab={this.state.activeTab}
        headerState={this.props.headerState}
        checkActiveScroll={this.checkActiveScroll}>
        <Tab isActive={homeCN} label='Home' onClick={() => this._savePosition('/', { h: 3 })} />
        { this.props.userIsLoggedIn ? <Tab label='Feed' url={`${HOSTNAME}/?view=feed_preview`} /> : '' }
        <Tab isActive={flCN} label='Favorite' onClick={() => this._savePosition('/fave')} />
        <Tab isActive={hlCN} label='Hot List' onClick={() => this._savePosition('/hot')} />
        {
          this.props.userIsLoggedIn
          ? <Tab label='Wishlist' isActive={wlCN} onClick={() => this._savePosition('/wishlist')} />
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
export default connect(undefined, mapDispatchToProps)(HeaderTab)
