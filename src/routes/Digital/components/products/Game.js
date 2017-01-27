import React, { Component } from 'react'

import { DCONTENT } from '../../digitalcontents'
import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import InformationBox from '../parts/InformationBox'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Game extends Component {
  render () {
    <div>
      <InputGroup
        useAutoSuggest
        label='Jenis Voucher'
        placeholder='Pilih Jenis Voucher'
        value='Steam Wallet'
        items={DCONTENT[tab].products} />
      <SelectGroup
        useDrawer
        label='Nominal'
        placeholder='Pilih Nominal' />
      <InformationBox content={DCONTENT[tab].note} />
      <PriceGroup isDiscount price='Rp 15.000' oldPrice='Rp 16.000' />
      <BuyButtonGroup hasInstant buttonText='Beli' />
    </div>
  }
}

export default Game
