import React from 'react'
import './PromoSpacer.scss'

export const PromoSpacer = ({ children }) => (
  <div className='section-spacer'>
    Promo
  </div>
)

PromoSpacer.propTypes = {
  children: React.PropTypes.node
}

export default PromoSpacer
