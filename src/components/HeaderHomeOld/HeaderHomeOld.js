import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import { updateUserLoginStatus, updateSidebarStatus, storeUserData } from '../../store/app'
import BodyClassName from 'react-body-classname'
import TopedLiteAuthAPI from '../../lib/api/Auth/TopedLiteAuthAPI'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './HeaderHomeOld.scss'
import SearchInputOld from '../SearchInputOld'
import LoggedInMenu from './LoggedInMenu'
import LoggedOutMenu from './LoggedOutMenu'
import LoggedInTab from './LoggedInTab'
import LoggedOutTab from './LoggedOutTab'
import OverlaySplash from './OverlaySplash'

class HeaderHome extends Component {
  static propTypes = {
    updateUserLoginStatus: React.PropTypes.func,
    updateSidebarStatus: React.PropTypes.func,
    storeUserData: React.PropTypes.func,
    userData: React.PropTypes.object,
    userIsLoggedIn: React.PropTypes.bool,
    sidebarIsOpened: React.PropTypes.bool
  }

  state = {
    showSearch: true,
    showSearchModal: false
  }

  constructor (props) {
    super(props)

    this.authAPI = new TopedLiteAuthAPI()

    this.handleScroll = this.handleScroll.bind(this)
    this.openSidebarMenu = this.openSidebarMenu.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderSidebar = this.renderSidebar.bind(this)
    this.showSearch = this.showSearch.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)

    this.authAPI.getUserInfo().then(userinfo => {
      if (userinfo && userinfo['name'] && userinfo['id']) {
        this.props.updateUserLoginStatus(true)
        this.props.storeUserData({
          'id': userinfo['id'],
          'name': userinfo['name'],
          'profilePicture': userinfo['profilePicture'],
          'deposit': userinfo['deposit'],
          'notifications': userinfo['notifications']
        })
      } else {
        this.props.updateUserLoginStatus(false)
        this.props.storeUserData({
          id: '',
          name: '-',
          profilePicutre: '',
          deposit: 'Rp 0',
          topPoints: '0',
          notifications: {}
        })
      }
    })
  }

  componentWillUnmount () {
    window.removeEventListener && window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (event) {
    const ss = event.srcElement.body.scrollTop < 145
    this.setState({
      showSearch: ss,
      showSearchModal: false
    })
  }

  openSidebarMenu () {
    this.props.updateSidebarStatus(true)
    Scroll.animateScroll.scrollToTop({ smooth: false, duration: 0 })
  }

  renderTabs () {
    return this.props.userIsLoggedIn ? <LoggedInTab /> : <LoggedOutTab />
  }

  renderSidebar () {
    let result = null
    if (this.props.sidebarIsOpened && this.props.userIsLoggedIn) {
      result = <LoggedInMenu notifs={this.props.userData.notifications} />
    } else if (this.props.sidebarIsOpened && !this.props.userIsLoggedIn) {
      result = <LoggedOutMenu />
    }

    return result
  }

  renderOverlay () {
    let result = null
    if (this.props.sidebarIsOpened) {
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
    })
  }

  render () {
    let fixedHeaderCN = (this.state.showSearch) ? '' : 'transform'
    let finalSICN = `search-input u-relative`

    let cartNotif = this.props.userData.notifications['total_cart'] > 0 && this.props.userIsLoggedIn ? (
      <span className='header__cart-notification'>
        { this.props.userData.notifications['total_cart'] }
      </span>
    ) : null

    let headerNotif = this.props.userData.notifications['total_notif'] > 0 && this.props.userIsLoggedIn ? (
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
      <div className='u-clearfix'>
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
              <Link to='/' className='u-inline-block header__logo-container'>
                <span className='header__logo'>Tokopedia</span>
              </Link>
            </div>

            { this.state.showSearch &&
              <SearchInputOld injectClassName={finalSICN}
                injectPlaceholder='Cari Produk atau Toko'
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
              <a href='https://m.tokopedia.com/tx.pl' rel='nofollow' className='header__cart-link'>
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

        { this.props.sidebarIsOpened && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

const mapDispatchToProps = { updateUserLoginStatus, updateSidebarStatus, storeUserData }
const mapStateToProps = (state) => {
  return {
    sidebarIsOpened: state['app'] ? state['app'].sidebarIsOpen : state.sidebarIsOpen,
    userData: state['app'] ? state['app'].user.data : state.user.data,
    userIsLoggedIn: state['app'] ? state['app'].user.loggedIn : state.user.loggedIn
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
