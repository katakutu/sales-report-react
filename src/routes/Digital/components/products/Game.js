import React, { Component, PropTypes } from 'react'

import SelectDrawer from '../parts/SelectDrawer'
import InputGroup from '../parts/InputGroup'
import InformationBox from '../parts/InformationBox'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'
import SelectGroup from '../parts/SelectGroup'

class Game extends Component {

  static propTypes = {
    products: PropTypes.array,
    note: PropTypes.string,
    openDrawer: PropTypes.func,
    handleProductSelected: PropTypes.func,
    handleProductUnselected: PropTypes.func,
    filteredOperator: PropTypes.array,
    productList: PropTypes.array
  }

  constructor (props) {
    super(props)

    this.state = {
      selectedOperator: this.props.filteredOperator[0],
      selectedProduct: this.getDefaultProduct(this.props.filteredOperator[0]),
      open: false
    }

    this.getProductById = this.getProductById.bind(this)
    this.getOperatorByName = this.getOperatorByName.bind(this)
    this.handleCloseButton = this.handleCloseButton.bind(this)
    this.handleOpenOverlay = this.handleOpenOverlay.bind(this)
    this.handleProductSelect = this.handleProductSelect.bind(this)
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this)
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

  getOperatorByName (name) {
    for (let i = 0; i < this.props.filteredOperator.length; i++) {
      if (this.props.filteredOperator[i].name === name) {
        return this.props.filteredOperator[i]
      }
    }
  }

  handleCloseButton (e) {
    this.setState({ open: false })
  }

  handleOpenOverlay (e) {
    this.setState({ open: true })
  }

  handleProductSelect (e) {
    let defaultProduct = this.getProductById(e.target.value)
    this.setState({ selectedProduct: defaultProduct })
    this.setState({ open: false })
  }

  handleSuggestionSelected (name) {
    let operator = this.getOperatorByName(name)
    let defaultProductId = operator.default_product_id
    let defaultProduct = {}
    if (defaultProductId === 0) {
      defaultProduct = this.getDefaultProduct(operator)
    } else {
      defaultProduct = this.getProductById(defaultProductId)
    }
    this.setState({ selectedOperator: operator })
    this.setState({ selectedProduct: defaultProduct })
  }

  componentDidUpdate () {
    if (this.state.open) {
      window.scrollTo(0, 0)
    }
  }

  componentDidMount () {
    this.props.handleProductSelected()
  }

  render () {
    let itemsName = []
    let informationBox = null
    let priceGroup = null

    for (let i = 0; i < this.props.filteredOperator.length; i++) {
      let itemName = {}
      itemName = this.props.filteredOperator[i]
      itemName.text = this.props.filteredOperator[i].name
      itemsName.push(itemName)
    }

    if (this.state.selectedProduct.detail) {
      informationBox = <InformationBox content={this.state.selectedProduct.detail} />
    } else {
      informationBox = null
    }

    if (this.state.selectedProduct.promo_price) {
      priceGroup =
        <PriceGroup
          isDiscount
          price={this.state.selectedProduct.promo_price}
          oldPrice={this.state.selectedProduct.price} />
    } else {
      priceGroup = <PriceGroup isDiscount price={this.state.selectedProduct.price} />
    }

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
        <InputGroup
          useAutoSuggest
          label='Jenis Voucher'
          placeholder='Pilih Jenis Voucher'
          value={itemsName[0] ? itemsName[0].text : ''}
          items={itemsName}
          onSuggestionSelected={this.handleSuggestionSelected} />
        { this.state.selectedProduct.id &&
          <SelectGroup
            useDrawer
            label='Nominal'
            placeholder='Pilih Nominal'
            openDrawer={this.handleOpenOverlay}
            value={this.state.selectedProduct.desc} /> }
        { informationBox }
        { priceGroup }
        <BuyButtonGroup hasInstant buttonText='Beli' />
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

export default Game
