import React, { Component } from 'react'

import { DCONTENT } from '../../digitalcontents'
import RadioButtons from '../parts/RadioButtons'
import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class BPJS extends Component {
  render () {
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
  }
}

export default BPJS
