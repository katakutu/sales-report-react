import React from 'react'
import './PromoSpacer.scss'

import { HOSTNAME } from '../../constants'

export const PromoSpacer = ({ children }) => (
  <a href={`${HOSTNAME}/promo`} className='promo-spacer__link' target='_blank'>
    {/* <i className='promo-spacer__icon promo-spacer__icon--percent' /> */}
    Lihat Semua Promo
    <i className='promo-spacer__icon promo-spacer__icon--arrow' />
    <div className='u-clearfix'></div>
  </a>
)

PromoSpacer.propTypes = {
  children: React.PropTypes.node
}

export default PromoSpacer
