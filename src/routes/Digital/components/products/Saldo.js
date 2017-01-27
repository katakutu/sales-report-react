import React, { Component } from 'react'

import SelectGroup from '../parts/SelectGroup'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Saldo extends Component {
  render () {
    return (
      <div>
        <SelectGroup
          useDrawer
          label='Top Up'
          placeholder='Pilih Nominal' />
        <PriceGroup price='Rp 100.000' />
        <BuyButtonGroup buttonText='Beli' link='' linkText='Punya Gift Card Tokopedia?' />
      </div>
    )
  }
}

export default Saldo
