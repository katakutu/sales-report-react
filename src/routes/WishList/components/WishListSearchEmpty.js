import React from 'react'
import './WishListView.scss'

export const WishListSearchEmpty = () => (
  <div className='wishlist-container u-clearfix'>
    <div className='u-col u-col-6'>
      <p className='wishlist__search-result'>0 Hasil</p>
    </div>
    <div className='u-col u-col-6'>
      {/* give action on this section */}
      <span className='wishlist__reset-search'>Reset</span>
    </div>
    <div className='u-clearfix' />
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
