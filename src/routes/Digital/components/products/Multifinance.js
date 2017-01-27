import React, { Component, PropTypes } from 'react'

import SelectGroup from '../parts/SelectGroup'
import InputGroup from '../parts/InputGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Multifinance extends Component {

  static propTypes = {
    options: PropTypes.array
  }

  render () {
    return (
      <div>
        <SelectGroup
          label='Penyedia Pinjaman'
          placeholder='Pilih Penyedia Pinjaman'
          options={this.props.options} />
        <InputGroup
          label='Nomor Kontrak'
          placeholder='Masukkan Nomor Kontrak'
          tooltip='Nomor kontrak adalah nomor Anda'
        />
        <BuyButtonGroup buttonText='Beli' />
      </div>
    )
  }
}

export default Multifinance
