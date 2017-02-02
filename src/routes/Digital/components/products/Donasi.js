import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'

import SelectDrawer from '../parts/SelectDrawer'
import BuyButtonGroup from '../parts/BuyButtonGroup'

import BaznasLogo from '../../assets/lembaga/baznas1.png'
import DompetDuafaLogo from '../../assets/lembaga/dompet_duafa.png'
import PkpuLogo from '../../assets/lembaga/pkpu.png'
import YcabLogo from '../../assets/lembaga/ycab1.png'
import RumahZakatLogo from '../../assets/lembaga/rz.png'

class Donasi extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    handleProductSelected: PropTypes.func,
    productList: PropTypes.array,
    filteredOperator: PropTypes.array,
    showError: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedOperator: {},
      productName: '',
      productId: 0,
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

  handleCloseButton (e) {
    this.setState({ open: false })
  }

  handleContentChange (operator) {
    this.setState({ selectedOperator: operator })
    this.setState({ productId: operator.default_product_id }, this.props.handleProductSelected)
    this.setState({ productName: this.getProductById(operator.default_product_id).desc })
  }

  handleOpenOverlay (e) {
    this.setState({ open: true })
  }

  handleProductSelect (e) {
    this.setState({ productId: e.target.value })
    this.setState({ productName: this.getProductById(e.target.value).desc })
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

  renderProduct (data, index) {
    let checkFlag = false
    if (data.operator_id === this.state.selectedOperator.id) {
      if (this.state.selectedOperator.default_product_id === data.id) {
        checkFlag = true
      }
      return (
        <tr key={index}>
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

  componentDidUpdate () {
    if (this.state.open) {
      window.scrollTo(0, 0)
    }
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
          value={this.state.productId} />
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
          <BuyButtonGroup
            hasInstant
            buttonText='Salurkan Donasi'
            link='http://tkp.me/daftardonasi'
            linkText='Ingin daftar sebagai lembaga donasi?'
            onSubmit={this.handleSubmitForm} />
        </div>
        <SelectDrawer
          open={this.state.open}
          handleCloseButton={this.handleCloseButton}
          handleProductSelect={this.handleProductSelect}
          productList={this.props.productList}
          selectedOperator={this.state.selectedOperator} />
      </div>
    )
  }
}

export default Donasi
