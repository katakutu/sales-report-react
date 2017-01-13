import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import {
  updateUserLoginStatus,
  updateSearchModalStatus,
  updateSidebarStatus,
  storeUserData,
  initialState,
  updateScrollPosition
} from '../../store/app'
import BodyClassName from 'react-body-classname'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './HeaderHomeOld.scss'
// import SearchInputOld from '../SearchInputOld'
import SearchInput from '../SearchInput'
import LoggedInMenu from './LoggedInMenu'
import LoggedOutMenu from './LoggedOutMenu'
// import LoggedInTab from './LoggedInTab'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import LoggedOutTab from './LoggedOutTab'
import OverlaySplash from './OverlaySplash'

import { HOSTNAME } from '../../constants'
import lang from '../../lib/utils/Lang'

let scrollHistoryName = { '/': 'home', '/hot': 'hotlist' }

class HeaderHome extends Component {
  static propTypes = {
    activeTab: React.PropTypes.string,
    updateUserLoginStatus: React.PropTypes.func,
    updateSearchModalStatus: React.PropTypes.func,
    updateSidebarStatus: React.PropTypes.func,
    storeUserData: React.PropTypes.func,
    userData: React.PropTypes.object,
    userInfo: React.PropTypes.object,
    userIsLoggedIn: React.PropTypes.bool,
    searchModalIsOpen: React.PropTypes.bool,
    sidebar: React.PropTypes.object,
    tabIsAvailable: React.PropTypes.bool,
    lang: React.PropTypes.string,
    updateScrollPosition: React.PropTypes.func,
    location: React.PropTypes.object,
    scrollHistory: React.PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    showSearch: true,
    showSearchModal: false
  }

  constructor (props) {
    super(props)

    this._shouldShowSearch = this._shouldShowSearch.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.openSidebarMenu = this.openSidebarMenu.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderSidebar = this.renderSidebar.bind(this)
    this.showSearch = this.showSearch.bind(this)
    this._savePosition = this._savePosition.bind(this)
    this._scrollHistory = this._scrollHistory.bind(this)
  }

  _updateUserState (userIsLoggedIn, userShouldRedirect, userInfo) {
    if (userIsLoggedIn && userShouldRedirect) {
        // if user is logged in via marketplace, redirect to login page
        // to login here too
      window.location = '/login'
    } else if (userIsLoggedIn && !userShouldRedirect) {
      if (userInfo['id'] || userInfo['name'] || userInfo['profilePicture']) {
        this.props.updateUserLoginStatus(true)
        this.props.storeUserData({
          'id': userInfo['id'],
          'name': userInfo['name'],
          'profilePicture': userInfo['profilePicture'],
          'deposit': userInfo['deposit'],
          'points': userInfo['points'],
          'notifications': userInfo['notifications'],
          'shop': userInfo['shop'],
          'wallet': userInfo['wallet']
        })
      } else {
        this.props.updateUserLoginStatus(false)
        this.props.storeUserData(initialState)
      }
    } else {
      this.props.updateUserLoginStatus(false)
      this.props.storeUserData(initialState)
    }
  }

  _shouldShowSearch (scrollPos) {
    let heightOffset = 111
    if (this.props.tabIsAvailable) {
      heightOffset = 142
    }

    return scrollPos < heightOffset
  }

  _scrollHistory () {
    const { router } = this.context
    var scroll = Scroll.animateScroll
    var currentLocation = router.getCurrentLocation().pathname
    var currentKey = scrollHistoryName[currentLocation]
    var currentState = this.props.scrollHistory
    if (currentState) {
      if (currentState[currentKey]) {
        scroll.scrollTo(currentState[currentKey].point, {
          duration: 0,
          delay: 0,
          smooth: false,
          ignoreCancelEvents: true
        })
      }
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    const userIsLoggedIn = this.props.userInfo ? this.props.userInfo.isLoggedIn : false
    const userShouldRedirect = this.props.userInfo ? this.props.userInfo.shouldRedirect : false
    this._updateUserState(userIsLoggedIn, userShouldRedirect, this.props.userInfo)
    this.setState({
      showSearch: this._shouldShowSearch(document.body.scrollTop)
    })
    this._scrollHistory()
  }

  componentWillReceiveProps (nextProps) {
    const nowUI = this.props.userInfo
    const nextUI = nextProps.userInfo
    if (JSON.stringify(nowUI) !== JSON.stringify(nextUI)) {
      const userIsLoggedIn = nextUI ? nextUI.isLoggedIn : false
      const userShouldRedirect = nextUI ? nextUI.shouldRedirect : false

      this._updateUserState(userIsLoggedIn, userShouldRedirect, nextUI)
    }
  }

  componentWillUnmount () {
    window.removeEventListener && window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (event) {
    if (!this.props.sidebar.isOpen && !this.props.searchModalIsOpen) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      this.setState({
        showSearch: this._shouldShowSearch(scrollTop),
        showSearchModal: false
      })
    }
  }

  openSidebarMenu () {
    this.props.updateSidebarStatus(true)
    Scroll.animateScroll.scrollToTop({ smooth: false, duration: 0 })
    this.setState({ showSearch: true })
  }

  checkActive (val) {
    const { router } = this.context
    var currentLocation = router.getCurrentLocation().pathname
    let result = currentLocation === val
    return result
  }

  renderTabs () {
    if (this.props.tabIsAvailable) {
      return <Tabs>
        <Tab isActive={this.checkActive('/')} label='Home' onClick={() => this._savePosition('/')} />
        <Tab label='Feed' url={`${HOSTNAME}/?view=fehoted_preview`} />
        <Tab label='Favorite' url={`${HOSTNAME}/fav-shop.pl?view=1`} />
        <Tab isActive={this.checkActive('/hot')} label='Hot List' onClick={() => this._savePosition('/hot')} />
        <Tab label='Wishlist' url={`${HOSTNAME}/?view=wishlist_preview`} />
      </Tabs>
    } else {
      return <LoggedOutTab activeTab={this.props.activeTab} />
    }
  }

  renderSidebar () {
    let result = null
    if (this.props.sidebar.isOpen && this.props.userIsLoggedIn) {
      result = <LoggedInMenu
        notifs={this.props.userData.notifications}
        userData={this.props.userData}
        shop={this.props.userData.shop} />
    } else if (this.props.sidebar.isOpen && !this.props.userIsLoggedIn) {
      result = <LoggedOutMenu />
    }

    return result
  }

  renderOverlay () {
    let result = null
    if (this.props.sidebar.isOpen) {
      result = <OverlaySplash />
    }

    return result
  }

  showSearch () {
    this.setState({
      showSearch: true,
      showSearchModal: true
    }, () => {
      Scroll.animateScroll.scrollToTop({ smooth: false, duration: 0 })
      this.props.updateSearchModalStatus(true)
    })
  }

  _savePosition (val) {
    const { router } = this.context
    // get scrolled position
    var scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop
    // update scroll history
    var updateState = {}
    var currentLocation = router.getCurrentLocation().pathname
    var currentKey = scrollHistoryName[currentLocation]
    var currentState = this.props.scrollHistory
    // check available
    if (currentState) {
      // update state
      currentState[currentKey] = { path: currentLocation, point: scrollPosition }
      updateState = currentState
    } else {
      updateState[currentKey] = { path: currentLocation, point: scrollPosition }
    }
    // update to store
    this.props.updateScrollPosition(updateState)
    // push location state
    router.push({
      pathname: val
    })
  }

  render () {
    let fixedHeaderCN = (this.state.showSearch) ? '' : 'transform'
    let finalSICN = `search-input u-relative`

    let cartNotif = this.props.userIsLoggedIn && this.props.userData.notifications['total_cart'] > 0 ? (
      <span className='header__cart-notification'>
        { this.props.userData.notifications['total_cart'] }
      </span>
    ) : null

    let headerNotif = this.props.userIsLoggedIn && this.props.userData.notifications['total_notif'] > 0 ? (
      <i className='header__nav-notification' />
    ) : null

    const transitionSideBarOptions = {
      transitionName: 'sidebarEffect',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    const transitionOverlaySplashOptions = {
      transitionName: 'splashEffect',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    return (
      <div className='u-clearfix header__wrapper'>
        <header className={'header u-clearfix' + ' ' + fixedHeaderCN} role='banner'>
          <div className='u-relative u-clearfix'>
            <button className='header__nav' onClick={this.openSidebarMenu}>
              <div className='header__nav-burger'>
                <span />
                <span />
                <span />
              </div>
              { headerNotif }
            </button>
            <div className='u-center u-block'>
              <Link to='/?h=3' className='u-inline-block header__logo-container'>
                <span className='header__logo'>Tokopedia</span>
              </Link>
            </div>

            { this.state.showSearch &&
              <SearchInput injectClassName={finalSICN}
                injectPlaceholder={lang[this.props.lang]['Search Products or Stores']}
                showModal={this.state.showSearchModal} />
            }

            { !this.state.showSearch &&
              <div className='header__search'>
                <button className='header__search-btn' onClick={this.showSearch}>
                  <span>Search</span>
                </button>
              </div>
            }

            <div className='header__cart'>
              <a href={`${HOSTNAME}/tx.pl`} rel='nofollow' className='header__cart-link'>
                <span>Cart</span>
              </a>
              { cartNotif }
            </div>
          </div>

          { this.renderTabs() }
        </header>
        <ReactCSSTransitionGroup {...transitionSideBarOptions}>
          { this.renderSidebar() }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup {...transitionOverlaySplashOptions}>
          { this.renderOverlay() }
        </ReactCSSTransitionGroup>

        { this.props.sidebar.isOpen && <BodyClassName className='u-body-overflow-no-scroll' /> }
        { this.props.tabIsAvailable && <BodyClassName className='is-tab-available' /> }
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateUserLoginStatus,
  updateSearchModalStatus,
  updateSidebarStatus,
  storeUserData,
  updateScrollPosition
}
const mapStateToProps = (state) => {
  return {
    searchModalIsOpen: state['app'] ? state['app'].searchModalIsOpen : state.searchModalIsOpen,
    sidebar: state['app'] ? state['app'].sidebar : state.sidebar,
    userData: state['app'] ? state['app'].user.data : state.user.data,
    userIsLoggedIn: state['app'] ? state['app'].user.loggedIn : state.user.loggedIn,
    lang: state['app'] ? state['app'].lang : state.lang,
    scrollHistory: state['app'] ? state['app'].scrollHistory : state.scrollHistory
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
