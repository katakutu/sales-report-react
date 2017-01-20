import React from 'react'
import './WishListView.scss'

export const WishListSearchEmpty = () => (
  <div className='wishlist-container u-clearfix'>
    <div className='wishlist__not-found-holder'>
      <div className='wishlist__product-not-found'>
        Produk tidak ditemukan di Wishlist
      </div>
      <div className='wishlist__btn-holder'>
        <div className='wishlist__btn-see-all'>Lihat semua Wishlist</div>
      </div>
    </div>
  </div>
)

export default WishListSearchEmpty
