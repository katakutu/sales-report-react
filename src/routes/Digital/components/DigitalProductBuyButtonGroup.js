import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import './DigitalProductBuyButtonGroup.scss'

class DigitalProductBuyButtonGroup extends Component {

  static propTypes = {
    hasInstant: PropTypes.bool,
    buttonText: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      instantCheckout: false
    }
  }

  handleInstantCheckbox () {
    this.setState({ instantCheckout: !this.state.instantCheckout })
  }

  render () {
    return (
      <div className='dp--buy'>
        <div className={classNames('dp__checkbox', { 'u-hide': !this.props.hasInstant })}>
          <input
            type='checkbox'
            name='instant_checkout'
            id='instant_checkout'
            checked={this.state.instantCheckout}
            value={this.state.instantCheckout ? '1' : '0'} />
          <label htmlFor='instant_checkout' onClick={() => this.handleInstantCheckbox()} >
            <span className='dp-checkbox' />
            Bayar instan
          </label>
          <div className='trigger-tooltip u-inline-block'>
            <i className='icon-info-alt' />
            <div className='tooltip-container'>
              <div className='tooltip-box'>
                <p className='u-m0'>
                  Bayar dengan 1-klik menggunakan Saldo Tokopedia
                </p>
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='u-block u-center dp__btn btn--orange u-bold'>{this.props.buttonText}</button>
        <Link
          to={this.props.link}
          className={classNames('u-mx-auto', 'u-mt2', 'u-block', 'u-center', 'u-h3', { 'u-hide': !this.props.link })}>
          {this.props.linkText}
        </Link>
      </div>
    )
  }
}

export default DigitalProductBuyButtonGroup
