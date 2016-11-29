import React, { Component } from 'react'
import { Link } from 'react-router'
import './HeaderHomeOld.scss'

var Tabs = require('react-slick')
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
  componentDidMount () {
    var self = this
    setTimeout(function () {
      self.forceUpdate()
    }, 100)
  }

  render () {
    return (
      <div className='u-clearfix'>
        <header className='header u-clearfix' role='banner'>
          <div className='u-relative u-clearfix'>
            <button className='header__nav'>
              <div className='header__nav-burger'>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <i className='header__nav-notification'></i>
            </button>
            <div className='u-center u-block'>
              <Link to='/' className='u-inline-block header__logo-container'>
                <span className='header__logo'>Tokopedia</span>
              </Link>
            </div>
            {/* Hide search input when scrolltop */}
            <div className='search-input u-relative u-col-12'>
              <div className='u-px2 u-pt0 u-pb1'>
                <form action='#' method='get' className='u-relative'>
                  <input type='hidden' name='st' defaultValue='product' />
                  <label htmlFor='search_input' className='u-hide'>Search</label>
                  <input name='q' type='search' id='search_input' className='search-input__input' placeholder='Cari Produk atau Toko' />
                  <button className='search-input__btn'>
                    Search
                  </button>
                  <span className='search-input__cancel'></span>
                </form>
              </div>
            </div>
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
          <Tabs {...settings} className='tab logged-in'>
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
          </Tabs>
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
        <div className='drawer active'>
          <div className='drawer__container'>
            <span>Menu</span>
            <button>&times;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderHome
