import React, { Component, PropTypes } from 'react'
import './Content.scss'
import './parts/SelectDrawer.scss'
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
import Donasi from './products/Donasi'

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
      isValid: false,
      showError: false
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleProductSelected = this.handleProductSelected.bind(this)
  }

  handleSubmitForm (e) {
    if (this.state.isValid === false) {
      this.setState({ showError: true })
      e.preventDefault()
    }
  }

  handleProductSelected (e) {
    this.setState({ isValid: true })
  }

  renderTabContent (tab, filteredOperator, productList) {
    switch (tab) {
      case 'pulsa':
        return (
          <Pulsa openDrawer={(e) => this.handleOpenOverlay(e)} />
        )
      case 'paket-data':
        return (
          <PaketData note={DCONTENT[tab].note} openDrawer={(e) => this.handleOpenOverlay(e)} />
        )
      case 'bpjs':
        return (
          <BPJS radio={DCONTENT[tab].radio} openDrawer={(e) => this.handleOpenOverlay(e)} />
        )
      case 'pln':
        return (
          <PLN radio={DCONTENT[tab].radio} note={DCONTENT[tab].note} openDrawer={(e) => this.handleOpenOverlay(e)} />
        )
      case 'saldo':
        return (
          <Saldo openDrawer={(e) => this.handleOpenOverlay(e)} />
        )
      case 'tokocash':
        return (
          <div>
            Tokocash
          </div>
        )
      case 'game':
        return (
          <Game
            productList={productList}
            filteredOperator={filteredOperator}
            handleProductSelected={this.handleProductSelected}
            showError={this.state.showError} />
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
      case 'donasi':
        return (
          <Donasi
            productList={productList}
            filteredOperator={filteredOperator}
            handleProductSelected={this.handleProductSelected}
            showError={this.state.showError} />
        )
    }
  }

  render () {
    const productList = []
    const operatorList = []
    const filteredOperator = []

    this.props.productList.map((data, index) => {
      if (data.category_id === SLUG[this.props.tab] && data.status === 1) {
        productList.push(data)
        operatorList.push(data.operator_id)
      }
    })

    productList.sort(function (a, b) {
      return a.price_plain - b.price_plain
    })

    this.props.operatorList.map((data, index) => {
      if (operatorList.indexOf(data.id) > -1) {
        filteredOperator.push(data)
      }
    })

    return (
      <div className='u-clearfix dp-content'>
        <div className='dp__container'>
          <form method='GET' action={SITES['Pulsa']} onSubmit={this.handleSubmitForm}>
            <h1 className='u-clearfix u-block u-mt0 u-mb3 u-left-align u-col-12'>
              {DCONTENT[this.props.tab].title}
            </h1>
            {this.renderTabContent(this.props.tab, filteredOperator, productList)}
          </form>
        </div>
      </div>
    )
  }
}

export default Content
