import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import {
  updateUserLoginStatus,
  updateSearchModalStatus,
  updateSidebarStatus,
  storeUserData,
  initialState
} from '../../store/app'
import BodyClassName from 'react-body-classname'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './HeaderHomeOld.scss'
import SearchInput from '../SearchInput'
import LoggedInMenu from './LoggedInMenu'
import LoggedOutMenu from './LoggedOutMenu'
import HeaderTab from './HeaderTab'
import OverlaySplash from './OverlaySplash'

import { HOSTNAME } from '../../constants'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

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
    hideSearch: React.PropTypes.bool,
    lang: React.PropTypes.string,
    updateScrollPosition: React.PropTypes.func,
    location: React.PropTypes.object,
    scrollHistory: React.PropTypes.object
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
    if (this.props.hideSearch) {
      heightOffset = 55
    }

    return scrollPos < heightOffset
  }

  _scrollHistory () {
    let scroll = Scroll.animateScroll
    let currentKey = this.props.activeTab
    let currentState = this.props.scrollHistory
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

    if (this.props.userInfo && this.props.userInfo.id) {
      GTM.pushObject({
        'contactInfo': {
          'userId': this.props.userInfo.id,
          'userEmail': this.props.userInfo.email
        }
      })
    }
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
    let currentLocation = router.getCurrentLocation().pathname
    let result = currentLocation === val
    return result
  }

  renderTabs () {
    let fixedHeaderState = (this.state.showSearch) ? '' : 'transform'
    if (this.props.tabIsAvailable) {
      return (<HeaderTab
        headerState={fixedHeaderState}
        activeTab={this.props.activeTab}
        scrollHistory={this.props.scrollHistory}
        userIsLoggedIn={this.props.userIsLoggedIn} />)
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

            { !this.props.hideSearch && this.state.showSearch &&
              <SearchInput injectClassName={finalSICN}
                injectPlaceholder={lang[this.props.lang]['Search Products or Stores']}
                showModal={this.state.showSearchModal} />
            }

            { (!this.props.hideSearch && !this.state.showSearch) &&
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
        { this.props.hideSearch && <BodyClassName className='is-search-hidden' /> }
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateUserLoginStatus,
  updateSearchModalStatus,
  updateSidebarStatus,
  storeUserData
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
