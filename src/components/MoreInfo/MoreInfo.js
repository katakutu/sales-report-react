import React from 'react'
import './MoreInfo.scss'
export const MoreInfo = () => (
  <div className='more-info u-clearfix'>
    <div className='u-col-12 more-info__holder'>
      <button className='u-col-12 u-block more-info__header more-info__link'>
        Info Selengkapnya
        <i className='more-info__arrow' />
      </button>
      <ul className='u-list-reset more-info__content u-p0 u-m0'>
        <li>
          <a className='more-info__link' href='#'>
            Belanja di Tokopedia
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Jualan di Tokopedia
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Pesan Tiket Kereta
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Isi Ulang Pulsa
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Kegiatan Kami
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Seller Center
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Tentang Kami
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Karir
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Blog
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Syarat & Ketentuan
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Kebijakan Privasi
            <i className='more-info__arrow' />
          </a>
        </li>
        <li>
          <a className='more-info__link' href='#'>
            Hubungi Kami
            <i className='more-info__arrow' />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default MoreInfo
