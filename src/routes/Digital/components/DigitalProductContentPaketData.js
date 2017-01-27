import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './DigitalProductContent.scss'
import './DigitalProductInputGroup.scss'
import DigitalProductInputGroup from './DigitalProductInputGroup'
import DigitalProductSelectGroup from './DigitalProductSelectGroup'
import DigitalProductPriceGroup from './DigitalProductPriceGroup'
import DigitalProductInformationBox from './DigitalProductInformationBox'
import { SITES } from '../../../constants'

class DigitalProductContentPaketData extends Component {
  static propTypes = {
    title: PropTypes.string
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
      <div className='u-clearfix dp-content'>
        <div className='dp__container'>
          <form method='GET' action={SITES['Pulsa']}>
            <h1 className='u-clearfix u-block u-mt0 u-mb3 u-left-align u-col-12'>
              {this.props.title}
            </h1>
            <DigitalProductInputGroup
              label='Nomor Telepon'
              placeholder='Contoh 081234567890'
              tooltip='Nomor ponsel atau modem Anda' />
            <DigitalProductSelectGroup
              useDrawer
              label='Nominal'
              placeholder='Pilih Nominal' />
            <DigitalProductInformationBox
              isTokenListrik
              content='Harga Kuota 360MB - 600MB (sesuai zona terkait). Lihat detailnya di sini.' />
            <DigitalProductPriceGroup price='Rp 100.000' />
            <div className='dp--buy'>
              <div className='dp__checkbox checkbox'>
                <input
                  type='checkbox'
                  name='instant_checkout'
                  id='instant_checkout'
                  checked={this.state.instantCheckout}
                  value={this.state.instantCheckout ? '1' : '0'} />
                <label onClick={this.handleInstantCheckbox} >
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
              <button type='submit' className='u-block u-center dp__btn btn--orange'>Beli</button>
              <Link className='u-mx-auto u-mt2 u-block u-center u-h3'>Punya tagihan pascabayar?</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default DigitalProductContentPaketData
