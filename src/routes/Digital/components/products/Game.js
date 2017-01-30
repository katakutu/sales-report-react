import React, { Component, PropTypes } from 'react'

import SelectGroup from '../parts/SelectGroup'
import InputGroup from '../parts/InputGroup'
import InformationBox from '../parts/InformationBox'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Game extends Component {

  static propTypes = {
    products: PropTypes.array,
    note: PropTypes.string
  }

  render () {
    return (
      <div>
        <InputGroup
          useAutoSuggest
          label='Jenis Voucher'
          placeholder='Pilih Jenis Voucher'
          value='Steam Wallet'
          items={this.props.products} />
        <SelectGroup
          useDrawer
          label='Nominal'
          placeholder='Pilih Nominal' />
        <InformationBox content={this.props.note} />
        <PriceGroup isDiscount price='Rp 15.000' oldPrice='Rp 16.000' />
        <BuyButtonGroup hasInstant buttonText='Beli' />
      </div>
    )
  }
}

export default Game
