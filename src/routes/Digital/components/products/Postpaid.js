import React, { Component, PropTypes } from 'react'

import SelectGroup from '../parts/SelectGroup'
import InputGroup from '../parts/InputGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Postpaid extends Component {

  static propTypes = {
    options: PropTypes.array
  }

  render () {
    return (
      <div>
        <SelectGroup
          label='Operator'
          placeholder='Pilih Operator'
          options={this.props.options} />
        <InputGroup
          label='Nomor Telepon'
          placeholder='Contoh 081234567890'
          tooltip='Nomor Telepon Anda'
        />
        <BuyButtonGroup buttonText='Beli' />
      </div>
    )
  }
}

export default Postpaid
