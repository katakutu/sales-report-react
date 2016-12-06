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

import { HOSTNAME } from '../../constants'

class LoggedInMenu extends Component {
  static propTypes = {
    notifs: React.PropTypes.object,
    userData: React.PropTypes.object,
    updateSidebarStatus: React.PropTypes.func
  }

  state = {
    inboxIsOpen: false,
    purchaseIsOpen: false,
    salesIsOpen: false
  }

  constructor (props) {
    super(props)

    this._totalObjectValues = this._totalObjectValues.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.handleInboxClicked = this.handleInboxClicked.bind(this)
    this.handleSalesClicked = this.handleSalesClicked.bind(this)
    this.handlePurhcaseClicked = this.handlePurhcaseClicked.bind(this)
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

  handleSalesClicked () {
    this.setState({ salesIsOpen: !this.state.salesIsOpen })
  }

  handlePurhcaseClicked () {
    this.setState({ purchaseIsOpen: !this.state.purchaseIsOpen })
  }

  render () {
    let inboxClass = (!this.state.inboxIsOpen) ? 'u-display-none' : ''
    let purchaseClass = (!this.state.purchaseIsOpen) ? 'u-display-none' : ''
    let salesClass = (!this.state.salesIsOpen) ? 'u-display-none' : ''

    let inboxNotif = this._totalObjectValues(this.props.notifs['inbox']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null
    let purchaseNotif = this._totalObjectValues(this.props.notifs['sales']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null
    let salesNotif = this._totalObjectValues(this.props.notifs['sales']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null

    let inboxMessageNotif = this.props.notifs['inbox']['inbox_message'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['inbox_message'] }</span>
    ) : null
    let inboxPDNotif = this.props.notifs['inbox']['inbox_talk'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['inbox_talk'] }</span>
    ) : null
    let inboxReviewNotif = this.props.notifs['inbox']['inbox_reputation'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['inbox_reputation'] }</span>
    ) : null
    let inboxCSNotif = this.props.notifs['inbox']['inbox_ticket'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['inbox_ticket'] }</span>
    ) : null
    let inboxRCNotif = this.props.notifs['inbox']['resolution_center'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['resolution_center'] }</span>
    ) : null

    let purchaseCancelNotif = this.props.notifs['purchase']['purchase_reorder'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['purchase']['purchase_reorder'] }</span>
    ) : null
    let purchaseConfirmNotif = this.props.notifs['purchase']['purchase_payment_confirm'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>
        { this.props.notifs['purchase']['purchase_payment_confirm'] }
      </span>
    ) : null
    let purchaseOSNotif = this.props.notifs['purchase']['purchase_order_status'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>
        { this.props.notifs['purchase']['purchase_order_status'] }
      </span>
    ) : null
    let purchaseDCNotif = this.props.notifs['purchase']['purchase_delivery_confirm'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>
        { this.props.notifs['purchase']['purchase_delivery_confirm'] }
      </span>
    ) : null
    let purchaseTLNotif = this.props.notifs['purchase']['transaction_list'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['purchase']['transaction_list'] }</span>
    ) : null

    let salesNONotif = this.props.notifs['sales']['sales_new_order'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['sales']['sales_new_order'] }</span>
    ) : null
    let salesSCNotif = this.props.notifs['sales']['sales_shipping_confirm'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['sales']['sales_shipping_confirm'] }</span>
    ) : null
    let salesDSNotif = this.props.notifs['sales']['sales_shipping_status'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['sales']['sales_shipping_status'] }</span>
    ) : null
    let salesTLNotif = this.props.notifs['sales']['transaction_list'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['sales']['transaction_list'] }</span>
    ) : null
    let salesPLNotif = this.props.notifs['sales']['product_list'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['sales']['product_list'] }</span>
    ) : null
    let salesEtalaseNotif = this.props.notifs['sales']['etalase'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['sales']['etalase'] }</span>
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
            <img className='drawer__user-photo' src={this.props.userData.profilePicture} alt='tokopedia' />
            <div className='drawer__username u-mt1'>{ this.props.userData.name }</div>
          </div>
          <div className='drawer__user-summary u-clearfix'>
            <div className='drawer__user-summary-box u-left'>
              <span>{ this.props.userData.deposit }</span>
              <div className='drawer__user-infosum-title'>Saldo</div>
            </div>
            <div className='drawer__user-summary-box u-right'>
              <span>{ this.props.userData.points }</span>
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
            <a href='/'>
              <img className='drawer__menu-icon' src={homeIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Beranda</span>
            </a>
          </div>
          <div className='drawer__menu'>
            <a href={`${HOSTNAME}/?view=wishlist_preview`}>
              <img className='drawer__menu-icon' src={wishlistIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Wishlist</span>
            </a>
          </div>
          <div className='drawer__menu' onClick={this.handleInboxClicked}>
            <a>
              <img className='drawer__menu-icon' src={inboxIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Kotak Masuk</span>
              { inboxNotif }
              <img src='https://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${inboxClass}`}>
              <li><a href={`${HOSTNAME}/inbox-message.pl`}>Pesan{inboxMessageNotif}</a></li>
              <li><a href={`${HOSTNAME}/inbox-talk.pl`}>Diskusi Produk{inboxPDNotif}</a></li>
              <li><a href={`${HOSTNAME}/inbox-reputation.pl`}>Ulasan{inboxReviewNotif}</a></li>
              <li><a href={`${HOSTNAME}/inbox-ticket.pl`}>Layanan Pengguna{inboxCSNotif}</a></li>
              <li><a href={`${HOSTNAME}/resolution-center.pl`}>Pusat Resolusi{inboxRCNotif}</a></li>
            </ul>
          </div>
          <div className='drawer__menu' onClick={this.handlePurhcaseClicked}>
            <a>
              <img className='drawer__menu-icon' src={buyingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Pembelian</span>
              { purchaseNotif }
              <img src='https://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${purchaseClass}`}>
              <li>
                <a href={`${HOSTNAME}/tx_order_list.pl?status=5`}>
                  Pesan Dibatalkan{purchaseCancelNotif}
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_payment_confirm.pl`}>
                  Konfirmasi Pembayaran{purchaseConfirmNotif}
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_order_status.pl`}>
                  Status Pemesanan{purchaseOSNotif}
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_order_list.pl?status=9`}>
                  Konfirmasi Penerimaan{purchaseDCNotif}
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_order_list.pl`}>
                  Daftar Transaksi{purchaseTLNotif}
                </a>
              </li>
            </ul>
          </div>
          <div className='drawer__menu' onClick={this.handleSalesClicked}>
            <a>
              <img className='drawer__menu-icon' src={sellingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Penjualan</span>
              { salesNotif }
              <img src='https://placehold.it/15x15' alt='tokopedia' className='drawer__menu-arrow' />
            </a>
            <ul className={`drawer__menu-child ${salesClass}`}>
              <li><a href='#'>Pesanan Baru{salesNONotif}</a></li>
              <li><a href='#'>Konfirmasi Pengiriman{salesSCNotif}</a></li>
              <li><a href='#'>Status Pengiriman{salesDSNotif}</a></li>
              <li><a href='#'>Daftar Transaksi{salesTLNotif}</a></li>
              <li><a href='#'>Daftar Produk{salesPLNotif}</a></li>
              <li><a href='#'>Etalase Toko{salesEtalaseNotif}</a></li>
            </ul>
          </div>
          <div className='drawer__menu'>
            <a href='/logout'>
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
