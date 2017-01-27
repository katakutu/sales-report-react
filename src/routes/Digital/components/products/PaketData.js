import React, { Component } from 'react'

import { DCONTENT } from '../../digitalcontents'
import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Pulsa extends Component {
  render () {
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
  }
}

export default Pulsa
