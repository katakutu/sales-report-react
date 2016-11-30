import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateUserLoginStatus, updateSidebarStatus } from '../../store/app'

import './HeaderHomeOld.scss'
import TabSlider from 'react-slick'
import SearchInputOld from '../SearchInputOld'
import LoggedOutMenu from './LoggedOutMenu'
import LoggedInMenu from './LoggedInMenu'

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  draggable: true,
  centerMode: false,
  variableWidth: true,
  slidesToShow: 4,
  slidesToScroll: 1
}

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
    this.renderSidebar = this.renderSidebar.bind(this)
  }

  openSidebarMenu () {
    this.props.updateSidebarStatus(true)
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

            {/* Hide search input when scrolltop */}
            <SearchInputOld injectClassName='search-input u-relative u-col-12'
              injectPlaceholder='Cari Produk atau Toko' />
            { /* Search input ends */ }

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
          {/* Show this when logged in */}
          <TabSlider {...settings} className='tab logged-in'>
            <div className='tab-item active'>
              <label className='tab-link'>
                <a href='#'>Home</a>
              </label>
            </div>
            <div className='tab-item'>
              <label className='tab-link'>
                <a href='#'>Feed</a>
              </label>
            </div>
            <div className='tab-item'>
              <label className='tab-link'>
                <a href='#'>Favorit</a>
              </label>
            </div>
            <div className='tab-item'>
              <label className='tab-link'>
                <a href='#'>Hot List</a>
              </label>
            </div>
            <div className='tab-item'>
              <label className='tab-link'>
                <a href='#'>Wishlist</a>
              </label>
            </div>
          </TabSlider>
          {/* Show this when logged out */}
          <div className='tab logged-out u-display-none'>
            <div className='tab-item active'>
              <label className='tab-link'>
                <a href='#'>Home</a>
              </label>
            </div>
            <div className='tab-item'>
              <label className='tab-link'>
                <a href='#'>Hot List</a>
              </label>
            </div>
          </div>
        </header>

        { this.renderSidebar() }
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
