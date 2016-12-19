import React from 'react'
import './CatalogCategory.scss'

export const CatalogCategory = () => (
  <div className='u-clearfix u-mt3'>
    <div className='catalog-category__header'>
      Pakaian
      <i className='catalog-category__arrowdown' />
    </div>

    <div className='catalog-category__holder u-clearfix'>
      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Wanita
          <i className='catalog-category__arrowright' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Pria
          <i className='catalog-category__arrowright' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Anak Perempuan
          <i className='catalog-category__arrowright' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Anak Laki-laki
          <i className='catalog-category__arrowright' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Kaos
          <i className='catalog-category__arrowright' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Baju Korea
          <i className='catalog-category__arrowright' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Batik
          <i className='catalog-category__arrowright' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Baju Muslim
          <i className='catalog-category__arrowright' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Baju Couple
          <i className='catalog-category__arrowright' />
        </div>
      </div>
    </div>
  </div>
)

export default CatalogCategory
