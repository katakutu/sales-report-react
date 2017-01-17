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
    this.checkActiveScroll = this.checkActiveScroll.bind(this)
  }

  static propTypes = {
    appIsLoading: React.PropTypes.func,
    activeTab: React.PropTypes.string,
    headerState: React.PropTypes.string,
    userIsLoggedIn: React.PropTypes.bool,
    scrollHistory: React.PropTypes.object,
    updateScrollPosition: React.PropTypes.func
  }

  state = {
    activeTab: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount () {
    this.checkActiveScroll()
  }

  componentWillReceiveProps (nextProps) {
    this.checkActiveScroll()
  }

  checkActiveScroll () {
    const rangeScroll = 80
    let inner = window.innerWidth
    const vpWidth = Math.max(document.documentElement.clientWidth, inner || 0)
    const activeEle = document.querySelector('#slick-track .tab__active')
    let offPage = (vpWidth - rangeScroll) < activeEle.offsetLeft
    if (offPage) {
      let widthTabs = document.getElementById('slick-track').offsetWidth
      const slideTrackEl = document.querySelector('#loggedin-tab #slick-track')
      const maxTranslateX = -1 * (widthTabs - vpWidth)
      slideTrackEl.style.transform = `translate3d(${maxTranslateX}px, 0px, 0px)`
      this.setState({
        activeTab: 'activePrev'
      })
    }
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
    const wlCN = this.props.activeTab === 'wishlist'

    return (
      <Tabs userIsLoggedIn={this.props.userIsLoggedIn}
        stateTab={this.state.activeTab}
        headerState={this.props.headerState}>
        <Tab isActive={homeCN} label='Home' onClick={() => this._savePosition('/', { h: 3 })} />
        { this.props.userIsLoggedIn ? <Tab label='Feed' url={`${HOSTNAME}/?view=feed_preview`} /> : '' }
        { this.props.userIsLoggedIn ? <Tab label='Favorite' url={`${HOSTNAME}/fav-shop.pl?view=1`} /> : '' }
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
