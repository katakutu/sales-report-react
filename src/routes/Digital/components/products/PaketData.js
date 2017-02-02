import React, { Component, PropTypes } from 'react'

import InputGroup from '../parts/InputGroup'
import SelectGroup from '../parts/SelectGroup'
import PriceGroup from '../parts/PriceGroup'
import InformationBox from '../parts/InformationBox'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Pulsa extends Component {
  static propTypes = {
    note: PropTypes.string,
    openDrawer: PropTypes.func
  }

  render () {
    return (
      <div>
        <InputGroup
          label='Nomor Telepon'
          placeholder='Contoh 081234567890'
          tooltip='Nomor ponsel atau modem Anda' />
        <SelectGroup
          useDrawer
          label='Nominal'
          placeholder='Pilih Nominal'
          openDrawer={this.props.openDrawer} />
        <InformationBox
          content={this.props.note} />
        <PriceGroup price='Rp 100.000' />
        <BuyButtonGroup
          hasInstant
          buttonText='Beli' />
      </div>
    )
  }
}

export default Pulsa
