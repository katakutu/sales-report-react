import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './DigitalProductContent.scss'
import './DigitalProductSelectDrawer.scss'
import DigitalProductSelectGroup from './DigitalProductSelectGroup'
import DigitalProductInputGroup from './DigitalProductInputGroup'
import DigitalProductRadioButtons from './DigitalProductRadioButtons'
import DigitalProductInformationBox from './DigitalProductInformationBox'
import DigitalProductPriceGroup from './DigitalProductPriceGroup'
import DigitalProductBuyButtonGroup from './DigitalProductBuyButtonGroup'
import { SLUG } from './digitalconstants'
import { SITES } from '../../../constants'
import { DCONTENT } from './digitalcontents'

import BaznasLogo from '../assets/lembaga/baznas1.png'
import DompetDuafaLogo from '../assets/lembaga/dompet_duafa.png'
import PkpuLogo from '../assets/lembaga/pkpu.png'
import YcabLogo from '../assets/lembaga/ycab1.png'

class DigitalProductContent extends Component {
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
          <div>
            <DigitalProductInputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor ponsel atau modem Anda' />
            <DigitalProductSelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <DigitalProductPriceGroup price='Rp 100.000' />
            <DigitalProductBuyButtonGroup
              hasInstant
              buttonText='Beli'
              link=''
              linkText='Punya tagihan pascabayar?' />
          </div>
        )
      case 'data':
        return (
          <div>
            <DigitalProductInputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor ponsel atau modem Anda' />
            <DigitalProductSelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <DigitalProductInformationBox
              content={DCONTENT[tab].note} />
            <DigitalProductPriceGroup price='Rp 100.000' />
            <DigitalProductBuyButtonGroup
              hasInstant
              buttonText='Beli' />
          </div>
        )
      case 'bpjs':
        return (
          <div>
            <DigitalProductRadioButtons buttons={DCONTENT[tab].radio} />
            <DigitalProductInputGroup
              label='Nomor Kepesertaan BPJS'
              placeholder='Contoh 0000001291029761'
              tooltip='Nomor virtual account keluarga anda untuk BPJS Kesehatan/ Nomor KTP untuk BPJS Ketenagakerjaan' />
            <DigitalProductSelectGroup
              useDrawer
              label='Bayar Hingga'
              placeholder='Pilih Bulan' />
            <DigitalProductBuyButtonGroup buttonText='Bayar' />
          </div>
        )
      case 'pln':
        return (
          <div>
            <DigitalProductRadioButtons buttons={DCONTENT[tab].radio} />
            <DigitalProductInputGroup
              label='No. Meter/ID Pel.'
              placeholder='Contoh 1122334455'
              tooltip='No. Meter atau Id Pelanggan adalah nomor yang tertera pada kartu pelanggan' />
            <DigitalProductSelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <DigitalProductInformationBox content={DCONTENT[tab].note} />
            <DigitalProductPriceGroup price='Rp 102.500' />
            <DigitalProductBuyButtonGroup buttonText='Bayar' />
          </div>
        )
      case 'saldo':
        return (
          <div>
            <DigitalProductSelectGroup
              useDrawer
              label='Top Up'
              placeholder='Pilih Nominal' />
            <DigitalProductPriceGroup price='Rp 100.000' />
            <DigitalProductBuyButtonGroup buttonText='Beli' link='' linkText='Punya Gift Card Tokopedia?' />
          </div>
        )
      case 'tokocash':
        return (
          <div />
        )
      case 'game':
        return (
          <div>
            <DigitalProductInputGroup
              useAutoSuggest
              label='Jenis Voucher'
              placeholder='Pilih Jenis Voucher'
              value='Steam Wallet'
              items={DCONTENT[tab].products} />
            <DigitalProductSelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <DigitalProductInformationBox content={DCONTENT[tab].note} />
            <DigitalProductPriceGroup isDiscount price='Rp 15.000' oldPrice='Rp 16.000' />
            <DigitalProductBuyButtonGroup hasInstant buttonText='Beli' />
          </div>
        )
      case 'air':
        return (
          <div />
        )
      case 'tvkabel':
        return (
          <div>
            <DigitalProductSelectGroup
              label='Layanan TV Kabel'
              placeholder='Pilih Layanan TV Kabel'
              options={DCONTENT[tab].options} />
            <DigitalProductInputGroup
              label='Nomor Pelanggan TV Kabel'
              placeholder='Contoh 1230123123'
              tooltip='Nomor Pelanggan Anda'
            />
            <DigitalProductBuyButtonGroup buttonText='Beli' />
          </div>
        )
      case 'donasi':
        return (
          <div />
        )
      case 'postpaid':
        return (
          <div>
            <DigitalProductSelectGroup
              label='Operator'
              placeholder='Pilih Operator'
              options={DCONTENT[tab].options} />
            <DigitalProductInputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor Telepon Anda'
            />
            <DigitalProductBuyButtonGroup buttonText='Beli' />
          </div>
        )
      case 'multifinance':
        return (
          <div>
            <DigitalProductSelectGroup
              label='Penyedia Pinjaman'
              placeholder='Pilih Penyedia Pinjaman'
              options={DCONTENT[tab].options} />
            <DigitalProductInputGroup
              label='Nomor Kontrak'
              placeholder='Masukkan Nomor Kontrak'
              tooltip='Nomor kontrak adalah nomor Anda'
            />
            <DigitalProductBuyButtonGroup buttonText='Beli' />
          </div>
        )
      case 'telephone':
        return (
          <div>
            <DigitalProductInputGroup
              label='Nomor telepon Anda'
              placeholder='Contoh: 0211234567'
              tooltip='Masukkan kode wilayah dan nomor telepon Anda'
            />
            <DigitalProductBuyButtonGroup buttonText='Beli' />
          </div>
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

    // Dummy data, remove when unneeded
    const information = [
      {
        text: '1. Pembayaran tagihan listrik tidak dapat dilakukan pada pukul 23.45-00.30 WIB sesuai dengan ketentuan PLN'
      },
      {
        text: '2. Proses verifikasi pembayaran membutuhkan waktu maksimum 2x24 jam'
      },
      {
        text: '3. Total tagihan yang tertera sudah termasuk denda (bila ada)'
      },
      {
        text: '4. Biaya admin adalah Rp 2500 per tagihan / bulan'
      }
    ]
    // Dummy stops here

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

    return (
      {/* Commented for development purpose
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
            { 'u-hide': this.state.selectedOperator.id !== 98 })}>
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
      */}
    )
  }
}

export default DigitalProductContent
