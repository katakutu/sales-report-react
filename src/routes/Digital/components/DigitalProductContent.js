import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import './DigitalProductContent.scss'
import { SLUG } from './digitalconstants'
import { SITES } from '../../../constants'

import BaznasLogo from '../assets/lembaga/baznas1.png'
import DompetDuafaLogo from '../assets/lembaga/dompet_duafa.png'
import PkpuLogo from '../assets/lembaga/pkpu.png'
import YcabLogo from '../assets/lembaga/ycab1.png'

class DigitalProductContent extends Component {
  static propTypes = {
    slug: PropTypes.string,
    productList: PropTypes.array,
    operatorList: PropTypes.array
  }

  constructor (props) {
    super(props)
    this.state = {
      instantCheckout: false,
      operatorId: 0,
      productId: 0,
      activeCategory: SLUG[this.props.slug],
      productList: []
    }

    this.renderOperator = this.renderOperator.bind(this)
    this.handleInstantCheckbox = this.handleInstantCheckbox.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
  }

  handleInstantCheckbox () {
    this.setState({
      instantCheckout: !this.state.instantCheckout
    })
  }

  handleContentChange (operator) {
    this.setState({
      operatorId: operator.id
    })

    const products = this.state.productList
    let defaultOption = '<option value=' + operator.default_product_id
    defaultOption += ' disabled>Pilih Nominal Donasi</option>'
    document.getElementsByClassName('nominal-select')[0].innerHTML = defaultOption
    this.setState({ productId: operator.default_product_id })

    for (let i = 0; i < products.length; i++) {
      if (products[i].operator_id === operator.id) {
        let selected = false
        if (operator.default_product_id === products[i].id) {
          selected = true
        }
        document.getElementsByClassName('nominal-select')[0].innerHTML += this.renderProduct(products[i], selected)
      }
    }
  }

  handleSelectProduct (event) {
    this.setState({ productId: event.target.value })

    return
  }

  renderProduct (data, selected) {
    let html = '<option value=' + data.id
    if (selected) {
      html += ' selected '
    }
    html += '>' + data.desc + '</option>'
    return html
  }

  renderOperator (data, index) {
    return (
      <li onClick={() => this.handleContentChange(data)}>
        <div className='dp-lembaga-tab-logo'>
          <img src={data.image} alt='' />
        </div>
      </li>
    )
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

    return (
      <div className='u-clearfix dp-content'>
        <div className='dp__container u-p0'>
          <form method='GET' action={SITES['Pulsa']}>
            <input
              type='hidden'
              value='init_data'
              name='action' />
            <input
              type='hidden'
              name='operator_id'
              value={this.state.operatorId} />
            <input
              type='hidden'
              name='product_id'
              value={this.state.productId} />
            <h1 className='u-clearfix u-block u-mt2 u-mb0 u-mx-auto u-left-align u-bold u-col-12'>
              Salurkan Donasi Untuk Berbagi Dengan Sesama
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
                  { 'u-hide': this.state.operatorId !== 95 })}>
                  <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                    <img src={BaznasLogo} alt='' className='u-align-middle' />
                  </div>
                  <div className='dp-lembaga-content-text'>
                    <p className='u-h5 u-mt0 u-mb2'>
                      Badan Amil Zakat Nasional (BAZNAS) merupakan lembaga yang di bentuk pemerintah melalui KEPPRES
                      No. 8 Tahun 2001 yang memiliki fungsi penghimpunan dan penyaluran zakat, infak, dan sedekah (ZIS)
                      sesuai undang-undang nomor 23 tahun 2011 tentang pengelolaan zakat.
                    </p>
                    <p className='u-h5 u-mt0 u-mb0'>
                      <a href='http://www.baznas.go.id/'>Lihat selengkapnya ›</a>
                    </p>
                  </div>
                </div>
                <div
                  className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
                  { 'u-hide': this.state.operatorId !== 98 })}>
                  <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                    <img src={YcabLogo} alt='' className='u-align-middle' />
                  </div>
                  <div className='dp-lembaga-content-text'>
                    <p className='u-h5 u-mt0 u-mb2'>
                      YCAB Foundation (Yayasan Cinta Anak Bangsa) adalah sebuah organisasi non-profit yang berfokus pada
                      menciptakan kemandirian bagi anak muda melalui pendidikan, pemberdayaan ekonomi dan promosi gaya
                      hidup sehat.
                    </p>
                    <p className='u-h5 u-mt0 u-mb0'>
                      <a href='http://www.ycabfoundation.org/'>Lihat selengkapnya ›</a>
                    </p>
                  </div>
                </div>
                <div
                  className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
                  { 'u-hide': this.state.operatorId !== 97 })}>
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
                  { 'u-hide': this.state.operatorId !== 99 })}>
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
              <div className={'form-group nominal u-mb2 u-block ' + (this.state.operatorId === 0 ? 'u-hide' : '')}>
                <label className='u-mb1'>Nominal</label>
                <div className='dp-select'>
                  <select
                    className='dp-select form-control form-select nominal-select'
                    onChange={this.handleSelectProduct}>
                    <option value='0' disabled>Pilih Nominal Donasi</option>
                  </select>
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
      </div>
    )
  }
}

export default DigitalProductContent
