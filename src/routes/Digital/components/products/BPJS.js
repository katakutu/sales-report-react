import React, { Component, PropTypes } from 'react'

import RadioButtons from '../parts/RadioButtons'
import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class BPJS extends Component {
  static propTypes = {
    radio: PropTypes.array,
    openDrawer: PropTypes.func
  }

  render () {
    return (
      <div>
        <RadioButtons buttons={this.props.radio} />
        <InputGroup
          label='Nomor Kepesertaan BPJS'
          placeholder='Contoh 0000001291029761'
          tooltip='Nomor virtual account keluarga anda untuk BPJS Kesehatan/ Nomor KTP untuk BPJS Ketenagakerjaan' />
        <SelectGroup
          useDrawer
          label='Bayar Hingga'
          placeholder='Pilih Bulan'
          openDrawer={this.props.openDrawer} />
        <BuyButtonGroup buttonText='Bayar' />
      </div>
    )
  }
}

export default BPJS
