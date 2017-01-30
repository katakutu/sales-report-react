import React, { Component, PropTypes } from 'react'

import SelectGroup from '../parts/SelectGroup'
import InputGroup from '../parts/InputGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Tvkabel extends Component {

  static propTypes = {
    options: PropTypes.array
  }

  render () {
    return (
      <div>
        <SelectGroup
          label='Layanan TV Kabel'
          placeholder='Pilih Layanan TV Kabel'
          options={this.props.options} />
        <InputGroup
          label='Nomor Pelanggan TV Kabel'
          placeholder='Contoh 1230123123'
          tooltip='Nomor Pelanggan Anda'
        />
        <BuyButtonGroup buttonText='Beli' />
      </div>
    )
  }
}

export default Tvkabel
