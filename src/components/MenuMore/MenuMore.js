import React from 'react'
import './MenuMore.scss'

export const MenuMore = () => (
  <div className='menu-more u-clearfix'>
    <div className='menu-more__header u-center'>
      <div className='menu-more__header-upper'>
        <img src='http://placehold.it/50x50' alt='' className='menu-more__avatar' />
        <p className='menu-more__username'>Fauzan Arief Rachman</p>
        <p className='menu-more__toppoints'>TopPoints Rp 500.000</p>
      </div>
      <div className='menu-more__header-lower'>
        <a href='#' className='menu-more__shop-btn'>
          <span className='u-block u-my1 menu-more__shop-name'>My Goods Store</span>
          <span className='u-block u-my1 menu-more__shop-type'>Reguler Merchant</span>
        </a>
        <div className='menu-more__saldo u-clearfix u-display-none'>
          <div className='u-col u-col-6 u-left-align'>
            Saldo
          </div>
          <div className='u-col u-col-6 u-right-align'>
            Rp 50.939.233
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MenuMore
