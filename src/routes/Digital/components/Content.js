import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './Content.scss'
import { SLUG } from '../digitalconstants'
import { SITES } from '../../../constants'
import { DCONTENT } from '../digitalcontents'

import Donasi from './products/Donasi'
import Saldo from './products/Saldo'
import Multifinance from './products/Multifinance'
import Telephone from './products/Telephone'

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
          <div>
            <InputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor ponsel atau modem Anda' />
            <SelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <PriceGroup price='Rp 100.000' />
            <BuyButtonGroup
              hasInstant
              buttonText='Beli'
              link=''
              linkText='Punya tagihan pascabayar?' />
          </div>
        )
      case 'data':
        return (
          <div>
            <InputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor ponsel atau modem Anda' />
            <SelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <InformationBox
              content={DCONTENT[tab].note} />
            <PriceGroup price='Rp 100.000' />
            <BuyButtonGroup
              hasInstant
              buttonText='Beli' />
          </div>
        )
      case 'bpjs':
        return (
          <div>
            <RadioButtons buttons={DCONTENT[tab].radio} />
            <InputGroup
              label='Nomor Kepesertaan BPJS'
              placeholder='Contoh 0000001291029761'
              tooltip='Nomor virtual account keluarga anda untuk BPJS Kesehatan/ Nomor KTP untuk BPJS Ketenagakerjaan' />
            <SelectGroup
              useDrawer
              label='Bayar Hingga'
              placeholder='Pilih Bulan' />
            <BuyButtonGroup buttonText='Bayar' />
          </div>
        )
      case 'pln':
        return (
          <div>
            <RadioButtons buttons={DCONTENT[tab].radio} />
            <InputGroup
              label='No. Meter/ID Pel.'
              placeholder='Contoh 1122334455'
              tooltip='No. Meter atau Id Pelanggan adalah nomor yang tertera pada kartu pelanggan' />
            <SelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <InformationBox content={DCONTENT[tab].note} />
            <PriceGroup price='Rp 102.500' />
            <BuyButtonGroup buttonText='Bayar' />
          </div>
        )
      case 'saldo':
        return (
          <Saldo />
        )
      case 'tokocash':
        return (
          <div />
        )
      case 'game':
        return (
          <Game products={DCONTENT[tab].products} note={DCONTENT[tab].note}/>
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
        <Donasi productList={productList} operatorList={operatorList} filteredOperator={filteredOperator} />
      )
    }
  }
}

export default Content
