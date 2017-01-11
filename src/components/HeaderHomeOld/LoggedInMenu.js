import React, { Component } from 'react'
import { connect } from 'react-redux'

import homeIcon from './assets/nav-home-icon.png'
import wishlistIcon from './assets/nav-wishlist-icon.png'
import inboxIcon from './assets/nav-inbox-icon.png'
import buyingIcon from './assets/nav-buying-icon.png'
import sellingIcon from './assets/nav-selling-icon.png'
import logoutIcon from './assets/nav-logout-icon.png'
import addShop from './assets/nav-add-shop-icon.png'

import {
  updateSidebarStatus,
  updateSidebarInboxStatus,
  updateSidebarPurcahseStatus,
  updateSidebarSalesStatus
} from '../../store/app'

import { HOSTNAME, SITES } from '../../constants'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

class LoggedInMenu extends Component {
  static propTypes = {
    notifs: React.PropTypes.object,
    userData: React.PropTypes.object,
    updateSidebarStatus: React.PropTypes.func,
    updateSidebarInboxStatus: React.PropTypes.func,
    updateSidebarPurcahseStatus: React.PropTypes.func,
    updateSidebarSalesStatus: React.PropTypes.func,
    sidebar: React.PropTypes.object,
    shop: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  state = {
    inboxIsOpen: true,
    purchaseIsOpen: true,
    salesIsOpen: true
  }

  constructor (props) {
    super(props)

    this._totalObjectValues = this._totalObjectValues.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.handleInboxClicked = this.handleInboxClicked.bind(this)
    this.handleSalesClicked = this.handleSalesClicked.bind(this)
    this.handlePurhcaseClicked = this.handlePurhcaseClicked.bind(this)
  }

  componentDidMount () {
    /*
     * This thing is workaround for rendering bug in Old webkit browsers.
     * See:
     *
     * - https://bugs.chromium.org/p/chromium/issues/detail?id=288747
     * - https://stackoverflow.com/questions/11258877/fixed-element-disappears-in-chrome
     *
     * We basically force webkit to re-render some element that's not rendering right
     * by calling it in console.log.
     *
     * Without this code, the "Buka Toko" button won't show on old default Android browser.
     */
    const el = document.querySelector('#toko-button')
    setTimeout(() => {
      el.style.display = 'none'
      el.style.bottom
      el.style.display = ''
      el.style.transform = 'translate3d(0, 0, 0)'
    }, 500)

    setTimeout(() => {
      this.setState({
        inboxIsOpen: false,
        purchaseIsOpen: false,
        salesIsOpen: false
      })
    }, 1000)

    // GTM for wallet
    if (!this.props.userData.wallet.linked) {
      GTM.pushEventName('wallet_no_link')
    }

    // for GTM to consume
    const event = new Event('MenuOpened')
    document.dispatchEvent(event)

    // remember last state
    // setTimeout is for workaround of previous workaround
    setTimeout(() => {
      this.setState({
        inboxIsOpen: this.props.sidebar.inboxOpen,
        purchaseIsOpen: this.props.sidebar.purchaseOpen,
        salesIsOpen: this.props.sidebar.salesOpen
      })
    }, 1100)
  }

  _totalObjectValues (object) {
    let result = 0
    if (object) {
      result = Object.keys(object).map(k => object[k])
                                  .filter(d => !isNaN(d))
                                  .reduce((t, n) => parseInt(t) + n, 0)
    }

    return result
  }

  closeSidebar () {
    this.props.updateSidebarStatus(false)
  }

  handleInboxClicked () {
    this.setState({
      inboxIsOpen: !this.state.inboxIsOpen
    }, () => {
      this.props.updateSidebarInboxStatus(this.state.inboxIsOpen)
    })
  }

  handleSalesClicked () {
    this.setState({
      salesIsOpen: !this.state.salesIsOpen
    }, () => {
      this.props.updateSidebarSalesStatus(this.state.salesIsOpen)
    })
  }

  handlePurhcaseClicked () {
    this.setState({
      purchaseIsOpen: !this.state.purchaseIsOpen
    }, () => {
      this.props.updateSidebarPurcahseStatus(this.state.purchaseIsOpen)
    })
  }

  render () {
    let inboxClass = (!this.state.inboxIsOpen) ? 'u-display-none' : ''
    let purchaseClass = (!this.state.purchaseIsOpen) ? 'u-display-none' : ''
    let salesClass = (!this.state.salesIsOpen) ? 'u-display-none' : ''
    let inboxParent = (!this.state.inboxIsOpen) ? '' : 'opened'
    let purchaseParent = (!this.state.purchaseIsOpen) ? '' : 'opened'
    let salesParent = (!this.state.salesIsOpen) ? '' : 'opened'
    let shopId = this.props.shop['shop_id']

    let walletSection = this.props.userData.wallet.linked ? (
      <div className='drawer__menu bg__grey-4' id='tokocash-balance-container'>
        <a href={SITES['Wallet']} className='deposit-link-sidebar display-block' target='_blank'>
          <span className='drawer__menu-icon icon__svg icon__tokocash' />
          <span className='drawer__menu-title u-inline-block'>TokoCash</span>
          <i className='icon-wallet-balance pull-left mr-5' />
          <span className='drawer__menu-detail'>
            { this.props.userData.wallet.balance }
          </span>
          <span className='white ellipsis pull-right display-block' />
        </a>
      </div>
    ) : (
      <div className='drawer__menu bg__grey-4' id='tokocash-balance-container' />
    )

    const isOfficialStore = +this.props.shop['is_official'] === 1
    const isGoldMerchant = +this.props.shop['is_gold'] === 1
    let goldMerchant = (isGoldMerchant && !isOfficialStore) ? (<i className='mi-sprite mi-gold' />) : null
    let officialStore = isOfficialStore ? (<i className='mi-official' />) : null
    let shopSection = (shopId === 'ERROR FAIL' || shopId === null || shopId === '0') ? (
      <div className='drawer__menu-shop u-clearfix' id='toko-button'>
        <a href={`${HOSTNAME}/myshop.pl`}>
          <div className='u-left'>
            <img className='drawer__menu-icon' src={addShop} alt='tokopedia' />
          </div>
          <div className='u-left drawer__menu-myshop'>
            <div className='drawer__menu-myshop-name'>
              { lang[this.props.lang]['Open Shop'] }
            </div>
          </div>
        </a>
      </div>
      ) : (
        <div className='drawer__menu-shop u-clearfix' id='toko-button'>
          <a href={`${HOSTNAME}/${this.props.shop['domain']}`}>
            <div className='u-left'>
              <img src={`${this.props.shop['logo']}`} alt='tokopedia' className='drawer__menu-shop-icon' />
            </div>
            <div className='u-left drawer__menu-myshop'>
              <div>{ lang[this.props.lang]['Toko Saya'] }</div>
              <div className='drawer__menu-myshop-name'>{`${this.props.shop['shop_name']}`}</div>
            </div>
            <div className='u-right'>
              { goldMerchant } { officialStore }
            </div>
          </a>
        </div>
    )
    let inboxNotif = this._totalObjectValues(this.props.notifs['inbox']) > 0 ? (
      <span className='drawer__menu-notif' />
    ) : null
    let purchaseNotif = this._totalObjectValues(this.props.notifs['purchase']) > 0 ? (
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
    let inboxReviewNotif = this.props.notifs['inbox']['inbox_review'] > 0 ? (
      <span className='u-right drawer__menu-child-notif'>{ this.props.notifs['inbox']['inbox_review'] }</span>
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
          <div className='drawer__user-box bg__grey-4'>
            <a href={`${HOSTNAME}/people/${this.props.userData.id}`}>
              <img className='drawer__user-photo' src={this.props.userData.profilePicture} alt='tokopedia' />
            </a>
            <div className='drawer__username u-mt1'>
              <a href={`${HOSTNAME}/people/${this.props.userData.id}`}>
                { this.props.userData.name }
              </a>
            </div>
          </div>
          <div className='drawer__menu bg__grey-4 first__menu'>
            <a href={`${HOSTNAME}/deposit.pl`}>
              <span className='drawer__menu-icon icon__svg icon__balance' />
              <span className='drawer__menu-title u-inline-block'>
                { lang[this.props.lang]['Balance'] }
              </span>
              <span id='user-total-toppoints' className='drawer__menu-detail'>
                { this.props.userData.deposit.deposit_fmt }
              </span>
            </a>
          </div>
          <input type='text'
            id='include-deposit'
            value={`${this.props.userData.deposit.deposit_fmt}`}
            readOnly
            hidden />

          {walletSection }

          <div className='drawer__menu bg__grey-4'>
            <a href={`${HOSTNAME}/lp.pl`}>
              <span className='drawer__menu-icon icon__svg topPointsIcon' alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>TopPoints</span>
              <span id='user-total-toppoints' className='drawer__menu-detail'>
                { this.props.userData.points.data.attributes.amount_formatted }
              </span>
            </a>
          </div>
          <div className='drawer__menu'>
            <a href='/?h=3'>
              <img className='drawer__menu-icon' src={homeIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>
                { lang[this.props.lang]['Home'] }
              </span>
            </a>
          </div>
          <div className='drawer__menu'>
            <a href={`${HOSTNAME}/?view=wishlist_preview`}>
              <img className='drawer__menu-icon' src={wishlistIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>Wishlist</span>
            </a>
          </div>
          <div className='drawer__menu'>
            <a onClick={this.handleInboxClicked}>
              <img className='drawer__menu-icon' src={inboxIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>
                { lang[this.props.lang]['Inbox'] }
              </span>
              { inboxNotif }
              <img src='https://placehold.it/15x15' alt='tokopedia' className={`drawer__menu-arrow ${inboxParent}`} />
            </a>
            <ul className={`drawer__menu-child ${inboxClass}`}>
              <li>
                <a href={`${HOSTNAME}/inbox-message.pl`}>
                  { lang[this.props.lang]['MESSAGE'] } { inboxMessageNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/inbox-talk.pl`}>
                  { lang[this.props.lang]['Talk About It'] } { inboxPDNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/inbox-reputation.pl`}>
                  { lang[this.props.lang]['Reviews'] } { inboxReviewNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/inbox-ticket.pl`}>
                  { lang[this.props.lang]['Customer Care'] } { inboxCSNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/resolution-center.pl`}>
                  { lang[this.props.lang]['Resolution Center'] } { inboxRCNotif }
                </a>
              </li>
            </ul>
          </div>
          <div className='drawer__menu'>
            <a onClick={this.handlePurhcaseClicked}>
              <img className='drawer__menu-icon' src={buyingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>
                { lang[this.props.lang]['Purchase'] }
              </span>
              { purchaseNotif }
              <img src='https://placehold.it/15x15'
                alt='tokopedia'
                className={`drawer__menu-arrow ${purchaseParent}`} />
            </a>
            <ul className={`drawer__menu-child ${purchaseClass}`}>
              <li>
                <a href={`${HOSTNAME}/tx_order_list.pl?status=5`}>
                  { lang[this.props.lang]['Cancelled Order'] } { purchaseCancelNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_payment_confirm.pl`}>
                  { lang[this.props.lang]['Confirm Payment'] } { purchaseConfirmNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_order_status.pl`}>
                  { lang[this.props.lang]['Order Status'] } { purchaseOSNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_order_list.pl?status=9`}>
                  { lang[this.props.lang]['Confirm Payment'] } { purchaseDCNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/tx_order_list.pl`}>
                  { lang[this.props.lang]['Dispute List'] } { purchaseTLNotif }
                </a>
              </li>
            </ul>
          </div>
          <div className='drawer__menu'>
            <a onClick={this.handleSalesClicked}>
              <img className='drawer__menu-icon' src={sellingIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>
                { lang[this.props.lang]['Sales'] }
              </span>
              { salesNotif }
              <img src='https://placehold.it/15x15' alt='tokopedia' className={`drawer__menu-arrow ${salesParent}`} />
            </a>
            <ul className={`drawer__menu-child ${salesClass}`}>
              <li>
                <a href={`${HOSTNAME}/myshop_order.pl`}>
                  { lang[this.props.lang]['New Order'] } { salesNONotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/myshop_order_process.pl`}>
                  { lang[this.props.lang]['Confirm Shipment'] } { salesSCNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/myshop_order_status.pl`}>
                  { lang[this.props.lang]['Product Shipping Status'] } { salesDSNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/myshop_order_list.pl`}>
                  { lang[this.props.lang]['Transaction Status'] } { salesTLNotif }
                </a>
              </li>
              <li>
                <a href={`${HOSTNAME}/manage-product.pl`}>
                  { lang[this.props.lang]['Product List'] } { salesPLNotif }
                </a>
              </li>
              <li><a href={`${HOSTNAME}/manage-freereturns.pl`}>Free Returns</a></li>
              <li>
                <a href={`${HOSTNAME}/myshop-etalase.pl`}>
                  { lang[this.props.lang]['QUICK_GUIDE_SHOP_GOLD_TITLE_9'] } { salesEtalaseNotif }
                </a>
              </li>
            </ul>
          </div>
          <div className='drawer__menu last__menu'>
            <a href={`${HOSTNAME}/logout`}>
              <img className='drawer__menu-icon' src={logoutIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>
                { lang[this.props.lang]['Sign Out'] }
              </span>
            </a>
          </div>

          { shopSection }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateSidebarStatus,
  updateSidebarInboxStatus,
  updateSidebarPurcahseStatus,
  updateSidebarSalesStatus
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    sidebar: state['app'] ? state['app'].sidebar : state.sidebar
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInMenu)
