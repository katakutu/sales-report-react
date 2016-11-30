import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateUserLoginStatus, updateSidebarStatus } from '../../store/app'
import BodyClassName from 'react-body-classname'

import './HeaderHomeOld.scss'
import SearchInputOld from '../SearchInputOld'
import LoggedInMenu from './LoggedInMenu'
import LoggedOutMenu from './LoggedOutMenu'
import LoggedInTab from './LoggedInTab'
import LoggedOutTab from './LoggedOutTab'

class HeaderHome extends Component {
  static propTypes = {
    updateUserLoginStatus: React.PropTypes.func,
    updateSidebarStatus: React.PropTypes.func,
    userIsLoggedIn: React.PropTypes.bool,
    sidebarIsOpened: React.PropTypes.bool
  }

  constructor (props) {
    super(props)

    this.openSidebarMenu = this.openSidebarMenu.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderSidebar = this.renderSidebar.bind(this)
  }

  openSidebarMenu () {
    this.props.updateSidebarStatus(true)
  }

  renderTabs() {
    return this.props.userIsLoggedIn ? <LoggedInTab /> : <LoggedOutTab />
  }

  renderSidebar () {
    let result = null
    if (this.props.sidebarIsOpened && this.props.userIsLoggedIn) {
      result = <LoggedInMenu />
    } else if (this.props.sidebarIsOpened && !this.props.userIsLoggedIn) {
      result = <LoggedOutMenu />
    }

    return result
  }

  render () {
    return (
      <div className='u-clearfix'>
        <header className='header u-clearfix' role='banner'>
          <div className='u-relative u-clearfix'>
            <button className='header__nav' onClick={this.openSidebarMenu}>
              <div className='header__nav-burger'>
                <span />
                <span />
                <span />
              </div>
              <i className='header__nav-notification' />
            </button>
            <div className='u-center u-block'>
              <Link to='/' className='u-inline-block header__logo-container'>
                <span className='header__logo'>Tokopedia</span>
              </Link>
            </div>

            <SearchInputOld injectClassName='search-input u-relative u-col-12'
              injectPlaceholder='Cari Produk atau Toko' />

            <div className='header__search'>
              <button className='header__search-btn'>
                <span>Search</span>
              </button>
            </div>
            <div className='header__cart'>
              <a href='https://m.tokopedia.com/tx.pl' rel='nofollow' className='header__cart-link'>
                <span>Cart</span>
              </a>
              <span className='header__cart-notification'>1</span>
            </div>
          </div>
          
          { this.renderTabs() }
        </header>

        { this.renderSidebar() }

        { this.props.sidebarIsOpened && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

const mapDispatchToProps = { updateUserLoginStatus, updateSidebarStatus }
const mapStateToProps = (state) => {
  return {
    sidebarIsOpened: state['app'] ? state['app'].sidebarIsOpen : state.sidebarIsOpen,
    userIsLoggedIn: state['app'] ? state['app'].user.loggedIn : state.user.loggedIn
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
