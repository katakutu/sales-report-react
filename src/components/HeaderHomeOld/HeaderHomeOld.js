import React, { Component } from 'react'
import { Link } from 'react-router'
import './HeaderHomeOld.scss'
import bannerDrawer from './assets/banner-drawer.png'
import homeIcon from './assets/nav-home-icon.png'
import loginIcon from './assets/nav-user-icon.png'
import registerIcon from './assets/nav-register-icon.png'
import userPhoto from './assets/mobile-usrnophoto1.png'
import wishlistIcon from './assets/nav-wishlist-icon.png'
import inboxIcon from './assets/nav-inbox-icon.png'
import buyingIcon from './assets/nav-buying-icon.png'
import sellingIcon from './assets/nav-selling-icon.png'
import logoutIcon from './assets/nav-logout-icon.png'
import shopPhoto from './assets/mobile-shopnophoto.png'

import SearchInputOld from '../SearchInputOld'

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
            <div className='header__search'>
              <button className='header__search-btn'>
                <span>Search</span>
              </button>
            </div>
            { /* */ }

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
        {/* SIDEBAR MENU BEFORE LOGIN - if you need show this side bar, add class active on class drawer */}
        <div className='drawer'>
          <div className='drawer-active__overlay' />
          <div className='drawer__container u-clearfix'>
            <div className='drawer__title u-clearfix'>
              <div className='u-left'>MENU</div>
              <div className='u-right u-relative'>
                <div className='nav-close'>
                  <div className='nav-close__child'>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className='drawer__banner'>
              <img className='drawer__banner-img' src={bannerDrawer} alt='tokopedia' />
            </div>
            <div className='drawer__menu'>
              <a href='#'>
                <img className='drawer__menu-icon' src={homeIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Beranda</span>
              </a>
            </div>
            <div className='drawer__menu'>
              <a href='#'>
                <img className='drawer__menu-icon' src={loginIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Masuk</span>
              </a>
            </div>
            <div className='drawer__menu'>
              <a href='#'>
                <img className='drawer__menu-icon' src={registerIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Daftar</span>
              </a>
            </div>
          </div>
        </div>
        {/* SIDEBAR MENU AFTER LOGIN - if you need show this sidebar, add class active on class drawer */}
        <div className='drawer'>
          <div className='drawer-active__overlay' />
          <div className='drawer__container u-clearfix'>
            <div className='drawer__title u-clearfix'>
              <div className='u-left'>MENU</div>
              <div className='u-right u-relative'>
                <div className='nav-close'>
                  <div className='nav-close__child'>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className='drawer__user-box'>
              <img className='drawer__user-photo' src={userPhoto} alt='tokopedia' />
              <div className='drawer__username u-mt1'>Donal Trump</div>
            </div>
            <div className='drawer__user-summary u-clearfix'>
              <div className='drawer__user-summary-box u-left'>
                <span>Rp 2.000.000.000</span>
                <div className='drawer__user-infosum-title'>Saldo</div>
              </div>
              <div className='drawer__user-summary-box u-right'>
                <span>Rp 1.000.000</span>
                <div className='drawer__user-infosum-title'>TopPoints</div>
              </div>
            </div>
            <div className='drawer__user-topup'>
              <a href='#' className='drawer__btn-topup'>Top Up Saldo</a>
            </div>
            <div className='drawer__menu-shop u-clearfix'>
              <div className='u-left'>
                <img src={shopPhoto} alt='tokopedia' className='drawer__menu-shop-icon' />
              </div>
              <div className='u-left drawer__menu-myshop'>
                <div>Toko Saya</div>
                <div className='drawer__menu-myshop-name'>iPhoneShop</div>
              </div>
            </div>
            <div className='drawer__menu'>
              <a href='#'>
                <img className='drawer__menu-icon' src={homeIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Beranda</span>
              </a>
            </div>
            <div className='drawer__menu'>
              <a href='#'>
                <img className='drawer__menu-icon' src={wishlistIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Wishlist</span>
              </a>
            </div>
            <div className='drawer__menu'>
              <a>
                <img className='drawer__menu-icon' src={inboxIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Kotak Masuk</span>
                <span className='drawer__menu-notif' />
                <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
              </a>
              <ul className='drawer__menu-child'>
                <li><a href='#'>Pesan<span className='u-right drawer__menu-child-notif'>1</span></a></li>
                <li><a href='#'>Diskusi Produk</a></li>
                <li><a href='#'>Ulasan</a></li>
                <li><a href='#'>Layanan Pengguna</a></li>
                <li><a href='#'>Pusat Resolusi</a></li>
              </ul>
            </div>
            <div className='drawer__menu'>
              <a>
                <img className='drawer__menu-icon' src={buyingIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Pembelian</span>
                <span className='drawer__menu-notif' />
                <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
              </a>
              <ul className='drawer__menu-child'>
                <li><a href='#'>Pesan Dibatalkan</a></li>
                <li><a href='#'>Konfirmasi Pembayaran</a></li>
                <li><a href='#'>Status Pemesanan<span className='u-right drawer__menu-child-notif'>1</span></a></li>
                <li><a href='#'>Konfirmasi Penerimaan</a></li>
                <li><a href='#'>Daftar Transaksi</a></li>
              </ul>
            </div>
            <div className='drawer__menu'>
              <a>
                <img className='drawer__menu-icon' src={sellingIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Penjualan</span>
                <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
              </a>
              <ul className='drawer__menu-child'>
                <li><a href='#'>Pesanan Baru</a></li>
                <li><a href='#'>Konfirmasi Pengiriman</a></li>
                <li><a href='#'>Status Pengiriman</a></li>
                <li><a href='#'>Daftar Transaksi</a></li>
                <li><a href='#'>Daftar Produk</a></li>
                <li><a href='#'>Etalase Toko</a></li>
              </ul>
            </div>
            <div className='drawer__menu'>
              <a href='#'>
                <img className='drawer__menu-icon' src={logoutIcon} alt='tokopedia' />
                <span className='drawer__menu-title u-inline-block'>Keluar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderHome
