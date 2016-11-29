import React from 'react'
import './PromoSpacer.scss'

export const PromoSpacer = ({ children }) => (
  <div className='promo-spacer'>
    <a href='#' className='promo-spacer__link'>
      <i className='promo-spacer__icon promo-spacer__icon--percent'></i>
      Lihat Semua Promo
      <i className='promo-spacer__icon promo-spacer__icon--arrow'></i>
    </a>
  </div>
)

PromoSpacer.propTypes = {
  children: React.PropTypes.node
}

export default PromoSpacer
