import React from 'react'
import './RecommendationProduct.scss'

export const RecommendationProduct = () => (
  <div className='u-clearfix recommendation-product-container'>
    <h2 className='text-header'>Yang lagi Hot</h2>
    <div className='recommendation-product__contents'>
      <div className='u-col u-col-6 recommendation-product__box'>
        <div className='recommendation-product__box-content'>
          <a href='#'>
            <img src='http://placehold.it/720x520' alt='' className='recommendation-product__img' />
            <div className='recommendation-product__content-desc'>
              <div className='title u-truncate'>Modem Mi-Fi</div>
              <div className='startto'>Mulai dari <span className='price'>Rp. 200rb</span></div>
            </div>
          </a>
        </div>
      </div>
      <div className='u-col u-col-6 recommendation-product__box'>
        <div className='recommendation-product__box-content'>
          <a href='#'>
            <img src='http://placehold.it/720x520' alt='' className='recommendation-product__img' />
            <div className='recommendation-product__content-desc'>
              <div className='title u-truncate'>Modem Mi-Fi</div>
              <div className='startto'>Mulai dari <span className='price'>Rp. 200rb</span></div>
            </div>
          </a>
        </div>
      </div>
      <div className='u-clearfix' />
      <div className='recommendation-product__see-all'>
        <a className='recommendation-product__see-all-link' href='https://www.tokopedia.com/toppicks/'>
          Lihat semua <i className='promo-spacer__icon promo-spacer__icon--arrow' />
        </a>
      </div>
    </div>
  </div>
)

export default RecommendationProduct
