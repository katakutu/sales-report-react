import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'

import SelectDrawer from '../parts/SelectDrawer'
import BuyButtonGroup from '../parts/BuyButtonGroup'
import SelectGroup from '../parts/SelectGroup'

import BaznasLogo from '../../assets/lembaga/baznas1.png'
import DompetDuafaLogo from '../../assets/lembaga/dompet_duafa.png'
import PkpuLogo from '../../assets/lembaga/pkpu.png'
import YcabLogo from '../../assets/lembaga/ycab1.png'
import RumahZakatLogo from '../../assets/lembaga/rz.png'

class Donasi extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    handleProductSelected: PropTypes.func,
    handleProductUnselected: PropTypes.func,
    productList: PropTypes.array,
    filteredOperator: PropTypes.array,
    showError: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedOperator: {},
      selectedProduct: {},
      open: false
    }

    this.getProductById = this.getProductById.bind(this)
    this.renderOperator = this.renderOperator.bind(this)
    this.handleCloseButton = this.handleCloseButton.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleOpenOverlay = this.handleOpenOverlay.bind(this)
    this.handleProductSelect = this.handleProductSelect.bind(this)
  }

  getProductById (id) {
    for (let i = 0; i < this.props.productList.length; i++) {
      if (this.props.productList[i].id === parseInt(id)) {
        return this.props.productList[i]
      }
    }
  }

  getDefaultProduct (operator) {
    let temporaryProduct = {}
    for (let i = 0; i < this.props.productList.length; i++) {
      if (this.props.productList[i].id === operator.default_product_id) {
        return this.props.productList[i]
      }
      if (this.props.productList[i].operator_id === operator.id) {
        temporaryProduct = this.props.productList[i]
      }
    }
    return temporaryProduct
  }

  handleCloseButton (e) {
    this.setState({ open: false })
  }

  handleContentChange (operator) {
    let defaultProductId = operator.default_product_id
    let defaultProduct = {}
    if (defaultProductId === 0) {
      defaultProduct = this.getDefaultProduct(operator)
    } else {
      defaultProduct = this.getProductById(defaultProductId)
    }
    this.setState({ selectedOperator: operator })
    this.setState({ selectedProduct: defaultProduct }, this.props.handleProductSelected)
  }

  handleOpenOverlay (e) {
    this.setState({ open: true })
  }

  handleProductSelect (e) {
    let defaultProduct = this.getProductById(e.target.value)
    this.setState({ selectedProduct: defaultProduct })
    this.setState({ open: false })
  }

  renderOperator (data, index) {
    return (
      <li onClick={() => this.handleContentChange(data)} key={index}>
        <div className={classNames('dp-lembaga-tab-logo', { 'active': this.state.selectedOperator.id === data.id })}>
          <img src={data.image} alt='' />
        </div>
      </li>
    )
  }

  componentDidUpdate () {
    if (this.state.open) {
      window.scrollTo(0, 0)
    }
  }

  componentDidMount () {
    this.props.handleProductUnselected()
  }

  render () {
    return (
      <div>
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
          value={this.state.selectedProduct.id} />
        <div className='dp--lembaga'>
          <div className='dp-lembaga-tab-list'>
            <label className='u-inline-block'>Pilih Lembaga Donasi</label>
            <div>
              <small
                className={'u-h5 error-input u-inline-block ' + (this.props.showError ? '' : 'u-display-none')}
                id='error-client-number'>
                Anda belum memilih lembaga donasi
              </small>
            </div>
            <ul className='u-clearfix u-mt0 u-mb0 u-pl0 u-list-style-none dp-lembaga-logo-list'>
              {this.props.filteredOperator.map(this.renderOperator)}
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
            <div
              className={classNames('u-clearfix', 'u-relative', 'dp-lembaga-content',
              { 'u-hide': this.state.selectedOperator.id !== 141 })}>
              <div className='u-relative u-mb2 u-center dp-lembaga-content-img'>
                <img src={RumahZakatLogo} alt='' className='u-align-middle' />
              </div>
              <div className='dp-lembaga-content-text'>
                <p className='u-h5 u-mt0 u-mb2'>
                  Rumah Zakat (RZ) adalah lembaga filantropi yang mengelola zakat, infak, sedekah, serta dana sosial
                  lainnya melalui program-program pemberdayaan masyarakat. Program pemberdayaan direalisasikan melalui
                  empat rumpun utama yaitu Senyum Juara (pendidikan), Senyum Sehat (kesehatan), Senyum Mandiri
                  (pemberdayaan ekonomi), serta Senyum Lestari (inisiatif kelestarian lingkungan).
                </p>
                <p className='u-h5 u-mt0 u-mb0'>
                  <a href='https://www.rumahzakat.org'>Lihat selengkapnya ›</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        { this.state.selectedProduct.id &&
          <SelectGroup
            useDrawer
            label='Nominal'
            placeholder='Pilih Nominal'
            openDrawer={this.handleOpenOverlay}
            value={this.state.selectedProduct.desc} /> }
        <BuyButtonGroup
          hasInstant
          buttonText='Salurkan Donasi'
          link='http://tkp.me/daftardonasi'
          linkText='Ingin daftar sebagai lembaga donasi?'
          onSubmit={this.handleSubmitForm} />
        <SelectDrawer
          open={this.state.open}
          handleCloseButton={this.handleCloseButton}
          handleProductSelect={this.handleProductSelect}
          productList={this.props.productList}
          selectedOperator={this.state.selectedOperator}
          productId={this.state.selectedProduct.id} />
      </div>
    )
  }
}

export default Donasi
