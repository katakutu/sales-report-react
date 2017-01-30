import React, { Component, PropTypes } from 'react'

import RadioButtons from '../parts/RadioButtons'
import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import InformationBox from '../parts/InformationBox'
import PriceGroup from '../parts/PriceGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class PLN extends Component {
  static propTypes = {
    radio: PropTypes.array,
    note: PropTypes.string,
    openDrawer: PropTypes.func
  }

  render () {
    return (
      <div>
        <RadioButtons buttons={this.props.radio} />
        <InputGroup
          label='No. Meter/ID Pel.'
          placeholder='Contoh 1122334455'
          tooltip='No. Meter atau Id Pelanggan adalah nomor yang tertera pada kartu pelanggan' />
        <SelectGroup
          useDrawer
          label='Nominal'
          placeholder='Pilih Nominal'
          openDrawer={this.props.openDrawer} />
        <InformationBox content={this.props.note} />
        <PriceGroup price='Rp 102.500' />
        <BuyButtonGroup buttonText='Bayar' />
      </div>
    )
  }
}

export default PLN
