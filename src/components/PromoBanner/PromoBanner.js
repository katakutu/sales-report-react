import React from 'react'
import './PromoBanner.scss'

export const PromoBanner = ({ targetUrl, imageUrl, imageAlt }) => (
  <a href={ targetUrl }
    className='promo-banner u-clearfix'>
    <img src={ imageUrl }
        alt={ imageAlt }
        className='u-fit u-block u-mx-auto' />
  </a>
)

PromoBanner.propTypes = {
  targetUrl: React.PropTypes.string,
  imageUrl: React.PropTypes.string,
  imageAlt: React.PropTypes.string
}

export default PromoBanner
