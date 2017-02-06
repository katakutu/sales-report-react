import React, { Component, PropTypes } from 'react'

import './Promo.scss'
import CopyIcon from '../assets/icon-copy.png'
import SurveyIcon from '../assets/icon-survey.png'

class Promo extends Component {
  static propTypes = {
    bannerList: PropTypes.array
  }

  renderBanner (data, index) {
    const beforeVoucherCode = data.subtitle.split('{')[0]
    const voucherCode = data.subtitle.substring(data.subtitle.lastIndexOf('{') + 1, data.subtitle.lastIndexOf('}'))
    const afterVoucherCode = data.subtitle.split('}')[1]
    let voucherCodeFlag = false

    if (voucherCode) {
      voucherCodeFlag = true
    }

    return (
      <a
        href={data.redirect_url}
        className='u-clearfix u-rounded u-mb2 dp-promo__box'
        key={`digital-banner-${data.id}`}
        target='_blank' >
        <div className='u-mb1 dp-promo__text'>
          {data.title}
        </div>
        <div className='dp-promo__text--sub'>
          {beforeVoucherCode}
          <span className='dp-promo__code'>
            {voucherCode}
          </span>
          <button className={'dp-promo__btn u-p0 ' + (voucherCodeFlag ? '' : 'u-hide')}>
            <img src={CopyIcon} alt='icon-copy-code' className='u-align-middle' />
          </button>
          {afterVoucherCode}
          <div className='u-center u-mt2 u-mb1 u-py1 u-rounded dp-promo__alert u-display-none'>
            Kode voucher tersalin
          </div>
        </div>
      </a>
    )
  }

  render () {
    return (
      <div className='wrapper'>

        <div className='u-clearfix dp-promo__container'>
          <div className='u-mb1 dp-promo__title'>
            <span>Promo</span>
          </div>
          <div className='dp-promo__content'>
            {this.props.bannerList.map(this.renderBanner)}
          </div>
        </div>

        <div className='u-center u-p2 dp-survey__container'>
          <picture>
            <img src={SurveyIcon} alt='icon-survey' className='u-align-middle' />
            Saran Anda penting bagi kami.
          </picture>
          <a
            target='_blank'
            href='http://tkp.me/pulsaff'
            className='u-nowrap dp-survey__link'>
              &nbsp;Klik link berikut ini.
          </a>
        </div>

      </div>
    )
  }
}

export default Promo
