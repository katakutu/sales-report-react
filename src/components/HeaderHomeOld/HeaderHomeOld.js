import React, { Component } from 'react'
import { Link } from 'react-router'
import './HeaderHomeOld.scss'

class HeaderHome extends Component {
  render () {
    return (
      <header className='header u-clearfix' role='banner'>
        <div className='u-relative'>
          <div className='u-absolute'>
            <div className='header__nav-burger'>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className='header__nav-notification'></span>
          </div>
          <div className='u-center u-block'>
            <Link to='/' className='u-inline-block header__logo-container'>
              <span className='header__logo'>Tokopedia</span>
            </Link>
          </div>
          <div className='u-relative u-col-12'>
            <div className='u-px2 u-pt0 u-pb2'>
              <form action='#' method='get' autocomplete='off' className='u-relative'>
                <input type='hidden' name='st' defaultValue='product' />
                <input name='q' type='search' className='search-input__input' placeholder='Cari Produk atau Toko' autocomplete='off' />
                <button className="search-input__btn">
                  Search
                </button>
                <span className='search-input__cancel'></span>
              </form>
            </div>
          </div>
          <div className='header__search'>
            <button className='header__search-btn'>
              Search
            </button>
          </div>
          <div className='header__cart'>
            <a href='https://m.tokopedia.com/tx.pl' rel='nofollow' className='header__cart-link'>
              Cart
            </a>
          </div>
        </div>
      </header>
    )
  }
}

export default HeaderHome
