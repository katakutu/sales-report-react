import React from 'react'
import './WishListView.scss'

export const WishList = () => (
  <div className='u-clearfix'>
    <div className='wishlist-container'>
      <div className='wishlist__searchbar-holder'>
        <i className='wishlist__icon wishlist__love-grey wishlist__set-love-grey' />
        <input type='text' name='searchwishlist' className='wishlist__searchbar' placeholder='Cari wishlist kamu' />
        <span className='wishlist__count-item'>10 item</span>
      </div>
      <div className='wishlist__contents-holder u-clearfix'>
        <div className='u-col u-col-6 wishlist__contents'>
          <div className='wishlist__content-box'>
            <div className='wishlist__button-wish'><i className='wishlist__icon wishlist__love-full' /></div>
            <a href='#'>
              <img src='http://placehold.it/720x720' className='wishlist__img' alt='tokopedia' />
              <div className='wishlist__title'>Kaos Cantwo The Travelers - Hijau Merah Muda Jambu</div>
            </a>
            <div className='wishlist__price'>Rp. 60.000</div>
            <div className='wishlist__rating'>
              <span className='wishlist__rating-star star_3' />
              <span className='wishlist__count-rating'>(14282989)</span>
            </div>
            <div className='wishlist__type-marketing'>
              <span className='wishlist__cashback'>Cashback 5%</span>
            </div>
            <a href='#'><div className='wishlist__shop-name'>Barakah Clothing Dept</div></a>
            <div className='wishlist__shop-loc-badge'>
              <span className='wishlist__shop-location u-truncate'>
                <i className='icon-location' />Tanggerang
              </span>
              <span className='wishlist__badges'>
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
              </span>
            </div>
            <div className='wishlist__buy'>
              <a href='#' className='wishlist__button-buy'>Beli</a>
            </div>
          </div>
        </div>
        <div className='u-col u-col-6 wishlist__contents'>
          <div className='wishlist__content-box'>
            <div className='wishlist__button-wish'><i className='wishlist__icon wishlist__love-empty' /></div>
            <a href='#'>
              <img src='http://placehold.it/720x720' className='wishlist__img' alt='tokopedia' />
              <div className='wishlist__title'>Kaos Cantwo The Travelers - Hijau</div>
            </a>
            <div className='wishlist__price'>Rp. 60.000</div>
            <div className='wishlist__rating'>
              <span className='wishlist__rating-star star_4' />
              <span className='wishlist__count-rating'>(14282989)</span>
            </div>
            <div className='wishlist__type-marketing'>
              <span className='wishlist__cashback'>Cashback 5%</span>
              <span className='wishlist__grosir-or-po'>Grosir</span>
              <span className='wishlist__grosir-or-po'>PO</span>
            </div>
            <a href='#'><div className='wishlist__shop-name'>Barakah Clothing Dept</div></a>
            <div className='wishlist__shop-loc-badge'>
              <span className='wishlist__shop-location u-truncate'>
                <i className='icon-location' />Tanggerang Yang Sangat Jauh Sekali Disebelahnya Ujung Kulon
              </span>
              <span className='wishlist__badges'>
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
              </span>
            </div>
            <div className='wishlist__buy'>
              <a href='#' className='wishlist__button-buy'>Beli</a>
            </div>
          </div>
        </div>
      </div>
      <div className='wishlist__contents-holder u-clearfix'>
        <div className='u-col u-col-6 wishlist__contents'>
          <div className='wishlist__content-box'>
            <div className='wishlist__button-wish'><i className='wishlist__icon wishlist__love-empty' /></div>
            <a href='#'>
              <img src='http://placehold.it/720x720' className='wishlist__img' alt='tokopedia' />
              <div className='wishlist__title'>Kaos Cantwo The Travelers - Hijau</div>
            </a>
            <div className='wishlist__price'>Rp. 60.000</div>
            <div className='wishlist__rating'>
              <span className='wishlist__rating-star star_3' />
              <span className='wishlist__count-rating'>(14282989)</span>
            </div>
            <div className='wishlist__type-marketing'>
              <span className='wishlist__grosir-or-po'>Grosir</span>
              <span className='wishlist__grosir-or-po'>PO</span>
            </div>
            <a href='#'><div className='wishlist__shop-name'>Barakah Clothing Dept</div></a>
            <div className='wishlist__shop-loc-badge'>
              <span className='wishlist__shop-location u-truncate'>
                <i className='icon-location' />Tanggerang Yang Sangat Jauh Sekali Disebelahnya Ujung Kulon
              </span>
              <span className='wishlist__badges'>
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
              </span>
            </div>
            <div className='wishlist__buy'>
              <a href='#' className='wishlist__button-buy'>Beli</a>
            </div>
          </div>
        </div>
        <div className='u-col u-col-6 wishlist__contents'>
          <div className='wishlist__content-box'>
            <div className='wishlist__button-wish'><i className='wishlist__icon wishlist__love-full' /></div>
            <a href='#'>
              <img src='http://placehold.it/720x720' className='wishlist__img' alt='tokopedia' />
              <div className='wishlist__title'>Kaos Cantwo The Travelers - Hijau</div>
            </a>
            <div className='wishlist__price'>Rp. 60.000</div>
            <div className='wishlist__rating'>
              <span className='wishlist__rating-star star_4' />
              <span className='wishlist__count-rating'>(14282989)</span>
            </div>
            <div className='wishlist__type-marketing'>
              <span className='wishlist__grosir-or-po'>PO</span>
            </div>
            <a href='#'><div className='wishlist__shop-name'>Barakah Clothing Dept</div></a>
            <div className='wishlist__shop-loc-badge'>
              <span className='wishlist__shop-location u-truncate'>
                <i className='icon-location' />Tanggerang Yang Sangat Jauh Sekali Disebelahnya Ujung Kulon
              </span>
              <span className='wishlist__badges'>
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
              </span>
            </div>
            <div className='wishlist__buy'>
              <a href='#' className='wishlist__button-buy'>Beli</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default WishList
