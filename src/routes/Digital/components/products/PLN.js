import React, { Component } from 'react'

import { DCONTENT } from '../../digitalcontents'
import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import InformationBox from '../parts/InformationBox'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class PLN extends Component {
  render () {
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
  }
}

export default PLN
