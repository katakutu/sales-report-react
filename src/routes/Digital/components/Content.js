import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './Content.scss'
import { SLUG } from '../digitalconstants'
import { SITES } from '../../../constants'
import { DCONTENT } from '../digitalcontents'

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
          <PaketData />
        )
      case 'bpjs':
        return (
          <BPJS />
        )
      case 'pln':
        return (
          <PLN />
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
          <Game />
        )
      case 'air':
        return (
          <Air />
        )
      case 'tvkabel':
        return (
          <div>
            <SelectGroup
              label='Layanan TV Kabel'
              placeholder='Pilih Layanan TV Kabel'
              options={DCONTENT[tab].options} />
            <InputGroup
              label='Nomor Pelanggan TV Kabel'
              placeholder='Contoh 1230123123'
              tooltip='Nomor Pelanggan Anda'
            />
            <BuyButtonGroup buttonText='Beli' />
          </div>
        )
      case 'donasi':
        return (
          <div />
        )
      case 'postpaid':
        return (
          <div>
            <SelectGroup
              label='Operator'
              placeholder='Pilih Operator'
              options={DCONTENT[tab].options} />
            <InputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor Telepon Anda'
            />
            <BuyButtonGroup buttonText='Beli' />
          </div>
        )
      case 'multifinance':
        return (
          <div>
            <SelectGroup
              label='Penyedia Pinjaman'
              placeholder='Pilih Penyedia Pinjaman'
              options={DCONTENT[tab].options} />
            <InputGroup
              label='Nomor Kontrak'
              placeholder='Masukkan Nomor Kontrak'
              tooltip='Nomor kontrak adalah nomor Anda'
            />
            <BuyButtonGroup buttonText='Beli' />
          </div>
        )
      case 'telephone':
        return (
          <div>
            <InputGroup
              label='Nomor telepon Anda'
              placeholder='Contoh: 0211234567'
              tooltip='Masukkan kode wilayah dan nomor telepon Anda'
            />
            <BuyButtonGroup buttonText='Beli' />
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
        <Donasi productList={productList} operatorList={operatorList} filteredOperator={filteredOperator} />
      )
    }
  }
}

export default Content
