import React from 'react'
import './CatalogCategory.scss'

export const CatalogCategory = () => (
  <div className='u-clearfix u-mt3'>
    <div className='catalog-category__header'>
      Pakaian
      <img className='catalog-category__arrowdown' src='https://placehold.it/10x10' />
    </div>

    <div className='catalog-category__holder u-clearfix'>
      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Wanita
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Pria
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Anak Perempuan
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Pakaian Anak Laki-laki
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Kaos
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Baju Korea
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Batik
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Baju Muslim
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
      </div>

      <div className='u-col u-col-12 catalog-category__content-holder'>
        <div className='u-col u-col-6 catalog-category__content u-truncate'>
          Baju Couple
          <img className='catalog-category__arrowright' src='https://placehold.it/10x10' />
        </div>
      </div>
    </div>
  </div>
)

export default CatalogCategory
