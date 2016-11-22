import React from 'react'
import './ProductList.scss'

export const ProductList = () => (
  <div className='u-clearfix pd-l-r panel-container'>
    <div className='product-list__holder-horizontal u-clearfix'>

      <div className='u-col u-col-6 product-list__box'>
        <a className='dp-block' href='#'>
          <img className='product-list__img' src='http://placehold.it/250x250' />
          <div className='product-list__name-price u-clearfix'>
            <div className='product-list__name'>Tshirt Tony Start Iron Man 3</div>
            <div className='product-list__price'>Rp. 3.000</div>
          </div>

          <div className='product-list__shop-location'>
            <div className='product-list__shop-name'>Central Jacket Bandung</div>
            <div className='product-list__location'>Bandung</div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-6 product-list__box'>
        <a className='dp-block' href='#'>
          <img className='product-list__img' src='http://placehold.it/250x250' />
          <div className='product-list__name-price'>
            <div className='product-list__name'>Jaket Vans Women Pink Blue Sweater Ansjsksk HAJJsjs ajdajssjS</div>
            <div className='product-list__price'>Rp. 50.000</div>
            <div className='u-clearfix'>
              <div className='u-col u-col-7'><span className='product-list__rating'><img src='http://placehold.it/71x16' /></span></div>
              <div className='u-col u-col-5'><span className='product-list__count-rating'>(1422412)</span></div>
            </div>
          </div>

          <div className='product-list__shop-location'>
            <div className='product-list__shop-name'>Central Jacket Bandung</div>
            <div className='u-clearfix'>
              <div className='u-col u-col-6'>
                <div className='product-list__location'><img className='product-list__icon-location' src='http://placehold.it/15x15' />Bandung</div>
              </div>
              <div className='u-col u-col-6 u-pull-right'>
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
              </div>
            </div>
          </div>
        </a>
      </div>

      <div className='u-clearfix'></div>
      <a className='product-list__see-all' href='#'>Lihat semua > </a>

    </div>
  </div>
)

export default ProductList
