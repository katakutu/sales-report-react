import React from 'react'
import './PromoSpacer.scss'

export const PromoSpacer = ({ children }) => (
  <div className='promo-spacer'>
    <a href='#' className='promo-spacer__link'>
      {/* <i className='promo-spacer__icon promo-spacer__icon--percent' /> */}
      Lihat Semua Promo
      <i className='promo-spacer__icon promo-spacer__icon--arrow' />
    </a>
  </div>
)

PromoSpacer.propTypes = {
  children: React.PropTypes.node
}

export default PromoSpacer
