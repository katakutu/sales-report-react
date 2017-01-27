import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './Content.scss'
import { SLUG } from '../digitalconstants'
import { SITES } from '../../../constants'
import { DCONTENT } from '../digitalcontents'

import Air from './products/Air'
import BPJS from './products/BPJS'
import Game from './products/Game'
import Pulsa from './products/Pulsa'
import PLN from './products/PLN'
import PaketData from './products/PaketData'
import Saldo from './products/Saldo'
import Multifinance from './products/Multifinance'
import Telephone from './products/Telephone'
import Tvkabel from './products/Tvkabel'
import Postpaid from './products/Postpaid'

import BaznasLogo from '../assets/lembaga/baznas1.png'
import DompetDuafaLogo from '../assets/lembaga/dompet_duafa.png'
import PkpuLogo from '../assets/lembaga/pkpu.png'
import YcabLogo from '../assets/lembaga/ycab1.png'

class Content extends Component {
  static propTypes = {
    slug: PropTypes.string,
    productList: PropTypes.array,
    operatorList: PropTypes.array,
    title: PropTypes.string,
    tab: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      instantCheckout: false,
      selectedOperator: {},
      productName: '',
      productId: 0,
      activeCategory: SLUG[this.props.slug],
      productList: [],
      open: false
    }

    this.getProductById = this.getProductById.bind(this)
    this.renderOperator = this.renderOperator.bind(this)
    this.renderProduct = this.renderProduct.bind(this)
    this.handleInstantCheckbox = this.handleInstantCheckbox.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleOpenOverlay = this.handleOpenOverlay.bind(this)
    this.handleCloseButton = this.handleCloseButton.bind(this)
    this.handleProductSelect = this.handleProductSelect.bind(this)
  }

  getProductById (id) {
    for (let i = 0; i < this.state.productList.length; i++) {
      if (this.state.productList[i].id === id) {
        return this.state.productList[i]
      }
    }
  }

  handleInstantCheckbox () {
    this.setState({ instantCheckout: !this.state.instantCheckout })
  }

  handleContentChange (operator) {
    this.setState({ selectedOperator: operator })
    this.setState({ productId: operator.default_product_id })
    this.setState({ productName: this.getProductById(operator.default_product_id).desc })
  }

  handleOpenOverlay (e) {
    this.setState({ open: true })
  }

  handleCloseButton (e) {
    this.setState({ open: false })
  }

  handleProductSelect (e) {
    this.setState({ productId: e.target.value })
    this.setState({ productName: this.getProductById(e.target.value).desc })
    this.setState({ open: false })
  }

  renderProduct (data, index) {
    let checkFlag = false
    if (data.operator_id === this.state.selectedOperator.id) {
      if (this.state.selectedOperator.default_product_id === data.id) {
        checkFlag = true
      }
      return (
        <tr>
          <td className='table__product'>
            <label htmlFor={data.id}>
              <div className='product__name'>{data.desc}</div>
              <div className='product__price'>
                <div className='price u-mr1'>{data.price}</div>
              </div>
            </label>
          </td>
          <td className='table__radio'>
            <input name='donation-nominal'
              id={data.id}
              type='radio'
              className='drawer__radio u-hide'
              value={data.id}
              onChange={this.handleProductSelect}
              defaultChecked={checkFlag} />
            <label htmlFor={data.id} className='drawer__icon--radio' />
          </td>
        </tr>
      )
    }
  }

  renderOperator (data, index) {
    return (
      <li onClick={() => this.handleContentChange(data)}>
        <div className={classNames('dp-lembaga-tab-logo', { 'active': this.state.selectedOperator.id === data.id })}>
          <img src={data.image} alt='' />
        </div>
      </li>
    )
  }

  renderTabContent (tab) {
    switch (tab) {
      case 'pulsa':
        return (
          <Pulsa />
        )
      case 'paket-data':
        return (
          <PaketData note={DCONTENT[tab].note} />
        )
      case 'bpjs':
        return (
          <BPJS radio={DCONTENT[tab].radio} />
        )
      case 'pln':
        return (
          <PLN radio={DCONTENT[tab].radio} note={DCONTENT[tab].note} />
        )
      case 'saldo':
        return (
          <Saldo />
        )
      case 'tokocash':
        return (
          <div>
            Tokocash
          </div>
        )
      case 'game':
        return (
          <Game products={DCONTENT[tab].products} note={DCONTENT[tab].note} />
        )
      case 'air':
        return (
          <Air products={DCONTENT[tab].products} />
        )
      case 'tv-kabel':
        return (
          <Tvkabel options={DCONTENT[tab].options} />
        )
      case 'postpaid':
        return (
          <Postpaid options={DCONTENT[tab].options} />
        )
      case 'multifinance':
        return (
          <Multifinance options={DCONTENT[tab].options} />
        )
      case 'telephone':
        return (
          <Telephone />
        )
    }
  }

  render () {
    const productList = []
    const operatorList = []
    const filteredOperator = []

    this.props.productList.map((data, index) => {
      if (data.category_id === this.state.activeCategory && data.status === 1) {
        productList.push(data)
        operatorList.push(data.operator_id)
      }
    })

    productList.sort(function (a, b) {
      return a.price_plain - b.price_plain
    })

    this.state.productList = productList

    this.props.operatorList.map((data, index) => {
      if (operatorList.indexOf(data.id) > -1) {
        filteredOperator.push(data)
      }
    })

    if (this.props.tab !== 'donasi') {
      return (
        <div className='u-clearfix dp-content'>
          <div className='dp__container'>
            <form method='GET' action={SITES['Pulsa']}>
              <input
                type='hidden'
                value='init_data'
                name='action' />
              <input
                type='hidden'
                name='operator_id'
                value={this.state.selectedOperator.id} />
              <input
                type='hidden'
                name='product_id'
                value={this.state.productId} />
              <h1 className='u-clearfix u-block u-mt0 u-mb3 u-left-align u-col-12'>
                {DCONTENT[this.props.tab].title}
              </h1>
              {this.renderTabContent(this.props.tab)}
            </form>
          </div>
          <div className={classNames('dp-drawer--select', { 'active': this.state.open })}>
            <div className='drawer__content'>
              <div className='drawer__header'>
                Nominal
                <span className='drawer__close' onClick={this.handleCloseButton}>&times;</span>
              </div>
              <div className='drawer__options'>
                <table className='drawer__table'>
                  <tbody>
                    {productList.map(this.renderProduct)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='drawer__overlay' />

            { this.state.open && <BodyClassName className='u-body-overflow-no-scroll' /> }
          </div>
        </div>
      )
    } else {
      return (
        <div className='u-clearfix dp-content'>
          <div className='dp__container'>
            <form method='GET' action={SITES['Pulsa']}>
              <input
                type='hidden'
                value='init_data'
                name='action' />
              <input
                type='hidden'
                name='operator_id'
                value={this.state.selectedOperator.id} />
              <input
                type='hidden'
                name='product_id'
                value={this.state.productId} />
              <h1 className='u-clearfix u-block u-mt0 u-mb3 u-left-align u-col-12'>
                {DCONTENT[this.props.tab].title}
              </h1>
              <div className='dp--lembaga'>
                <div className='dp-lembaga-tab-list'>
                  <label className='u-inline-block'>Pilih Lembaga Donasi</label>
                  <div>
                    <small className='u-h5 error-input u-display-none u-inline-block ' id='error-client-number'>
                      Anda belum memilih lembaga donasi
                    </small>
                  </div>
                  <ul className='u-clearfix u-mt0 u-mb0 u-pl0 u-list-style-none dp-lembaga-logo-list'>
                    {filteredOperator.map(this.renderOperator)}
                  </ul>
                </div>
                <div className='dp-lembaga-tab-content'>
                  <div
                    className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
                    { 'u-hide': this.state.selectedOperator.id !== 95 })}>
                    <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                      <img src={BaznasLogo} alt='' className='u-align-middle' />
                    </div>
                    <div className='dp-lembaga-content-text'>
                      <p className='u-h5 u-mt0 u-mb2'>
                        Badan Amil Zakat Nasional (BAZNAS) merupakan lembaga yang di bentuk pemerintah
                        melalui KEPPRES No. 8 Tahun 2001 yang memiliki fungsi penghimpunan dan penyaluran
                        zakat, infak, dan sedekah (ZIS) sesuai undang-undang nomor 23 tahun 2011 tentang
                        pengelolaan zakat.
                      </p>
                      <p className='u-h5 u-mt0 u-mb0'>
                        <a href='http://www.baznas.go.id/'>Lihat selengkapnya ›</a>
                      </p>
                    </div>
                  </div>
                  <div
                    className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
                    { 'u-hide': this.state.selectedOperator.id !== 98 })}>
                    <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                      <img src={YcabLogo} alt='' className='u-align-middle' />
                    </div>
                    <div className='dp-lembaga-content-text'>
                      <p className='u-h5 u-mt0 u-mb2'>
                        YCAB Foundation (Yayasan Cinta Anak Bangsa) adalah sebuah organisasi
                        non-profit yang berfokus pada menciptakan kemandirian bagi anak muda melalui
                        pendidikan, pemberdayaan ekonomi dan promosi gaya hidup sehat.
                      </p>
                      <p className='u-h5 u-mt0 u-mb0'>
                        <a href='http://www.ycabfoundation.org/'>Lihat selengkapnya ›</a>
                      </p>
                    </div>
                  </div>
                  <div
                    className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
                    { 'u-hide': this.state.selectedOperator.id !== 97 })}>
                    <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                      <img src={DompetDuafaLogo} alt='' className='u-align-middle' />
                    </div>
                    <div className='dp-lembaga-content-text'>
                      <p className='u-h5 u-mt0 u-mb2'>
                        Dompet Dhuafa adalah Lembaga Nirlaba milik masyarakat yang berkhidmat mengangkat harkat sosial
                        kemanusiaan dengan mendayagunakan Zakat, Infak, Sedekah dan Wakaf (ZISWAF) serta dana sosial
                        lainnya baik dari individu, kelompok maupun perusahaan.
                      </p>
                      <p className='u-h5 u-mt0 u-mb0'>
                        <a href='http://www.dompetdhuafa.org/'>Lihat selengkapnya ›</a>
                      </p>
                    </div>
                  </div>
                  <div
                    className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
                    { 'u-hide': this.state.selectedOperator.id !== 99 })}>
                    <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                      <img src={PkpuLogo} alt='' className='u-align-middle' />
                    </div>
                    <div className='dp-lembaga-content-text'>
                      <p className='u-h5 u-mt0 u-mb2'>
                        PKPU adalah sebuah badan hukum berbentuk yayasan yang bersifat sosial dan kemanusiaan dan
                        menjalankan kegiatan usahanya dalam bidang pengelolaan dana CSR dan dp-donasi tidak mengikat
                        lainnya.
                      </p>
                      <p className='u-h5 u-mt0 u-mb0'>
                        <a href='http://www.pkpu.or.id/'>Lihat selengkapnya ›</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='dp--nominal'>
                <div className={'form-group nominal u-mb2 u-block ' + (this.state.productId === 0 ? 'u-hide' : '')}>
                  <label className='u-mb1'>Nominal</label>
                  <div className='dp-select'>
                    <span
                      className='dp-select form-control form-select nominal-select pt-12'
                      onClick={this.handleOpenOverlay}>
                      {this.state.productName}
                    </span>
                  </div>
                </div>
                <div className='dp--buy'>
                  <div className='dp__checkbox checkbox'>
                    <input
                      type='checkbox'
                      name='instant_checkout'
                      id='instant_checkout'
                      checked={this.state.instantCheckout}
                      value={this.state.instantCheckout ? '1' : '0'} />
                    <label onClick={this.handleInstantCheckbox} >
                      <span className='dp-checkbox' />
                      Bayar instan
                    </label>
                    <div className='trigger-tooltip u-inline-block'>
                      <i className='icon-info-alt' />
                      <div className='tooltip-container'>
                        <div className='tooltip-box'>
                          <p className='u-m0'>
                            Bayar dengan 1-klik menggunakan Saldo Tokopedia
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type='submit' className='u-block u-center dp__btn btn--orange'>Salurkan Donasi</button>
                  <Link className='u-mx-auto u-mt2 u-block u-center u-h3'>Ingin daftar sebagai lembaga donasi?</Link>
                </div>
              </div>
            </form>
          </div>
          <div className={classNames('dp-drawer--select', { 'active': this.state.open })}>
            <div className='drawer__content'>
              <div className='drawer__header'>
                Nominal
                <span className='drawer__close' onClick={this.handleCloseButton}>×</span>
              </div>
              <div className='drawer__options'>
                <table className='drawer__table'>
                  <tbody>
                    {productList.map(this.renderProduct)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='drawer__overlay' />

            { this.state.open && <BodyClassName className='u-body-overflow-no-scroll' /> }
          </div>
        </div>
      )
    }
  }
}

export default Content
