import React, { Component, PropTypes } from 'react'
import './DigitalProductPriceGroup.scss'

class DigitalProductPriceGroup extends Component {

  static propTypes = {
    isDiscount: PropTypes.bool,
    price: PropTypes.string,
    oldPrice: PropTypes.string
  }

  render () {
    if (!this.props.isDiscount) {
      return (
        <div className='dp-pricegroup u-block u-clearfix form-group'>
          <label className='dp-pricegroup__label'>Harga</label>
          <p className='dp-pricegroup__price u-right u-m0'>
            <strong className='dp-pricegroup__price--primary'>{this.props.price}</strong>
          </p>
        </div>
      )
    } else {
      return (
        <div className='dp-pricegroup u-block u-clearfix form-group'>
          <label className='dp-pricegroup__label'>Harga</label>
          <p className='dp-pricegroup__price u-right u-m0'>
            <strong className='dp-pricegroup__price--primary text-red'>{this.props.price}</strong>
            <span className='dp-pricegroup__price--secondary'>{this.props.oldPrice}</span>
          </p>
        </div>
      )
    }
  }
}

export default DigitalProductPriceGroup
