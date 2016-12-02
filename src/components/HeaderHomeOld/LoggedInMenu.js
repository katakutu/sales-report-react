import React, { Component } from 'react'
import { connect } from 'react-redux'

import homeIcon from './assets/nav-home-icon.png'
import wishlistIcon from './assets/nav-wishlist-icon.png'
import inboxIcon from './assets/nav-inbox-icon.png'
import buyingIcon from './assets/nav-buying-icon.png'
import sellingIcon from './assets/nav-selling-icon.png'
import logoutIcon from './assets/nav-logout-icon.png'
import shopPhoto from './assets/mobile-shopnophoto.png'

import { updateSidebarStatus } from '../../store/app'

class LoggedInMenu extends Component {
  static propTypes = {
    notifs: React.PropTypes.object,
    userData: React.PropTypes.object,
    updateSidebarStatus: React.PropTypes.func
  }

  state = {
    inboxIsOpen: false,
    shoppingIsOpen: false,
    sellerIsOpen: false
  }

  constructor (props) {
    super(props)

    this._totalObjectValues = this._totalObjectValues.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.handleInboxClicked = this.handleInboxClicked.bind(this)
    this.handleSellerClicked = this.handleSellerClicked.bind(this)
    this.handleShoppingClicked = this.handleShoppingClicked.bind(this)
  }

  _totalObjectValues (object) {
    let result = 0
    if (object) {
      result = Object.keys(object).map(k => object[k]).reduce((t, n) => t + n, 0)
    }

    return result
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

    let inboxNotif = this._totalObjectValues(this.props.notifs['inbox']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null
    let shoppingNotif = this._totalObjectValues(this.props.notifs['shopping']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null
    let sellerNotif = this._totalObjectValues(this.props.notifs['seller']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null

    let inboxMessageNotif = this.props.notifs['inbox']['message'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['message'] }</span>
    ) : null
    let inboxPDNotif = this.props.notifs['inbox']['product_discussion'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['product_discussion'] }</span>
    ) : null
    let inboxReviewNotif = this.props.notifs['inbox']['review'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['review'] }</span>
    ) : null
    let inboxCSNotif = this.props.notifs['inbox']['customer_service'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['customer_service'] }</span>
    ) : null
    let inboxRCNotif = this.props.notifs['inbox']['resolution_center'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['resolution_center'] }</span>
    ) : null

    let shoppingCancelNotif = this.props.notifs['shopping']['cancelled'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['shopping']['cancelled'] }</span>
    ) : null
    let shoppingConfirmNotif = this.props.notifs['shopping']['confirmed'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['shopping']['confirmed'] }</span>
    ) : null
    let shoppingOSNotif = this.props.notifs['shopping']['order_status'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['shopping']['order_status'] }</span>
    ) : null
    let shoppingDCNotif = this.props.notifs['shopping']['delivery_confirmation'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>
        { this.props.notifs['shopping']['delivery_confirmation'] }
      </span>
    ) : null
    let shoppingTLNotif = this.props.notifs['shopping']['transaction_list'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['shopping']['transaction_list'] }</span>
    ) : null

    let sellerNONotif = this.props.notifs['seller']['new_order'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['seller']['new_order'] }</span>
    ) : null
    let sellerSCNotif = this.props.notifs['seller']['sent_confirmation'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['seller']['sent_confirmation'] }</span>
    ) : null
    let sellerDSNotif = this.props.notifs['seller']['delivery_status'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['seller']['delivery_status'] }</span>
    ) : null
    let sellerTLNotif = this.props.notifs['seller']['transaction_list'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['seller']['transaction_list'] }</span>
    ) : null
    let sellerPLNotif = this.props.notifs['seller']['product_list'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['seller']['product_list'] }</span>
    ) : null
    let sellerEtalaseNotif = this.props.notifs['seller']['etalase'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['seller']['etalase'] }</span>
    ) : null

    return (
      <div className='drawer active'>
        <div className='drawer__container u-clearfix'>
          <div className='drawer__title u-clearfix u-relative'>
            <div className='u-left'>MENU</div>
            <div className='nav-close' onClick={this.closeSidebar}>
              <div className='nav-close__child'>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className='drawer__user-box'>
            <img className='drawer__user-photo' src={this.props.userData.profilePicutre} alt='tokopedia' />
            <div className='drawer__username u-mt1'>{ this.props.userData.name }</div>
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
              { inboxNotif }
              <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${inboxClass}`}>
              <li><a href='#'>Pesan{inboxMessageNotif}</a></li>
              <li><a href='#'>Diskusi Produk{inboxPDNotif}</a></li>
              <li><a href='#'>Ulasan{inboxReviewNotif}</a></li>
              <li><a href='#'>Layanan Pengguna{inboxCSNotif}</a></li>
              <li><a href='#'>Pusat Resolusi{inboxRCNotif}</a></li>
            </ul>
          </div>
          <div className='drawer__menu' onClick={this.handleShoppingClicked}>
            <a>
              <img className='drawer__menu-icon' src={buyingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Pembelian</span>
              { shoppingNotif }
              <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${shoppingClass}`}>
              <li><a href='#'>Pesan Dibatalkan{shoppingCancelNotif}</a></li>
              <li><a href='#'>Konfirmasi Pembayaran{shoppingConfirmNotif}</a></li>
              <li><a href='#'>Status Pemesanan{shoppingOSNotif}</a></li>
              <li><a href='#'>Konfirmasi Penerimaan{shoppingDCNotif}</a></li>
              <li><a href='#'>Daftar Transaksi{shoppingTLNotif}</a></li>
            </ul>
          </div>
          <div className='drawer__menu' onClick={this.handleSellerClicked}>
            <a>
              <img className='drawer__menu-icon' src={sellingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Penjualan</span>
              { sellerNotif }
              <img src='http://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${sellerClass}`}>
              <li><a href='#'>Pesanan Baru{sellerNONotif}</a></li>
              <li><a href='#'>Konfirmasi Pengiriman{sellerSCNotif}</a></li>
              <li><a href='#'>Status Pengiriman{sellerDSNotif}</a></li>
              <li><a href='#'>Daftar Transaksi{sellerTLNotif}</a></li>
              <li><a href='#'>Daftar Produk{sellerPLNotif}</a></li>
              <li><a href='#'>Etalase Toko{sellerEtalaseNotif}</a></li>
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
