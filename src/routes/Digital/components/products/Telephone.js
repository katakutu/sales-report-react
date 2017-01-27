import React, { Component, PropTypes } from 'react'

import InputGroup from '../parts/InputGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Telephone extends Component {

  render () {
    return (
      <div>
        <InputGroup
          label='Nomor telepon Anda'
          placeholder='Contoh: 0211234567'
          tooltip='Masukkan kode wilayah dan nomor telepon Anda'
        />
        <BuyButtonGroup buttonText='Beli' />
      </div>
    )
  }
}

export default Telephone
