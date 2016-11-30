import React, { Component } from 'react'
import { connect } from 'react-redux'

import homeIcon from './assets/nav-home-icon.png'
import userPhoto from './assets/mobile-usrnophoto1.png'
import wishlistIcon from './assets/nav-wishlist-icon.png'
import inboxIcon from './assets/nav-inbox-icon.png'
import buyingIcon from './assets/nav-buying-icon.png'
import sellingIcon from './assets/nav-selling-icon.png'
import logoutIcon from './assets/nav-logout-icon.png'
import shopPhoto from './assets/mobile-shopnophoto.png'

import { updateSidebarStatus } from '../../store/app'

class LoggedInMenu extends Component {
  static propTypes = {
    updateSidebarStatus: React.PropTypes.func
  }

  state = {
    inboxIsOpen: false,
    shoppingIsOpen: false,
    sellerIsOpen: false
  }

  constructor (props) {
    super(props)

    this.closeSidebar = this.closeSidebar.bind(this)
    this.handleInboxClicked = this.handleInboxClicked.bind(this)
    this.handleSellerClicked = this.handleSellerClicked.bind(this)
    this.handleShoppingClicked = this.handleShoppingClicked.bind(this)
  }

  closeSidebar () {
    this.props.updateSidebarStatus(false)
  }

  handleInboxClicked () {
    this.setState({ inboxIsOpen: !this.state.inboxIsOpen })
  }

  handleSellerClicked () {
    this.setState({ sellerIsOpen: !this.state.sellerIsOpen })
  }

  handleShoppingClicked () {
    this.setState({ shoppingIsOpen: !this.state.shoppingIsOpen })
  }

  render () {
    let inboxClass = (!this.state.inboxIsOpen) ? 'u-display-none' : ''
    let shoppingClass = (!this.state.shoppingIsOpen) ? 'u-display-none' : ''
    let sellerClass = (!this.state.sellerIsOpen) ? 'u-display-none' : ''

    return (
      <div className='drawer active'>
        <div className='drawer-active__overlay'onClick={this.closeSidebar} />
        <div className='drawer__container u-clearfix'>
          <div className='drawer__title u-clearfix'>
            <div className='u-left'>MENU</div>
            <div className='u-right u-relative' onClick={this.closeSidebar}>
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
          <div className='drawer__menu' onClick={this.handleInboxClicked}>
            <a>
              <img className='drawer__menu-icon' src={inboxIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Kotak Masuk</span>
              <span className='drawer__menu-notif' />
              <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${inboxClass}`}>
              <li><a href='#'>Pesan<span className='u-right drawer__menu-child-notif'>1</span></a></li>
              <li><a href='#'>Diskusi Produk</a></li>
              <li><a href='#'>Ulasan</a></li>
              <li><a href='#'>Layanan Pengguna</a></li>
              <li><a href='#'>Pusat Resolusi</a></li>
            </ul>
          </div>
          <div className='drawer__menu' onClick={this.handleShoppingClicked}>
            <a>
              <img className='drawer__menu-icon' src={buyingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Pembelian</span>
              <span className='drawer__menu-notif' />
              <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${shoppingClass}`}>
              <li><a href='#'>Pesan Dibatalkan</a></li>
              <li><a href='#'>Konfirmasi Pembayaran</a></li>
              <li><a href='#'>Status Pemesanan<span className='u-right drawer__menu-child-notif'>1</span></a></li>
              <li><a href='#'>Konfirmasi Penerimaan</a></li>
              <li><a href='#'>Daftar Transaksi</a></li>
            </ul>
          </div>
          <div className='drawer__menu' onClick={this.handleSellerClicked}>
            <a>
              <img className='drawer__menu-icon' src={sellingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Penjualan</span>
              <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${sellerClass}`}>
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
    )
  }
}

const mapDispatchToProps = { updateSidebarStatus }
export default connect(undefined, mapDispatchToProps)(LoggedInMenu)
