import React from 'react'
import './CatalogCategory.scss'

export const CatalogCategory = () => (
  <div className='u-clearfix'>
    <div className='catalog-category__header'>
      Pakaian
      <img className='catalog-category__arrowdown' src='http://placehold.it/10x10' />
    </div>

    <div className='catalog-category__holder u-clearfix'>
      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Pakaian Wanita</div>
        </div>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Pakaian Pria</div>
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Pakaian Anak Perempuan</div>
        </div>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Pakaian Anak Laki-laki</div>
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Kaos</div>
        </div>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Baju Korea</div>
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Batik</div>
        </div>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Baju Muslim</div>
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6'>
          <div className='catalog-category__content ellipsis'>Baju Couple</div>
        </div>
      </div>
    </div>
  </div>
)

export default CatalogCategory
