import React from 'react'
import './Footer.scss'
import footerAppsApple from './assets/footer-apps-apple@2x.png'
import footerAppsAndroid from './assets/footer-apps-android@2x.png'

export const Footer = () => (
  <div className='footer u-clearfix'>
    <div className='footer__apps u-clearfix u-center'>
      <p className='u-line-height-4 footer__apps-text'>Dapatkan Aplikasi Mobile Tokopedia</p>
      <div className='u-inline-block u-px1 u-mb1'>
        <a href='#'>
          <img src={footerAppsAndroid} alt='' className='u-fit footer__apps-img' />
        </a>
      </div>
      <div className='u-inline-block u-px1 u-mb1'>
        <a href='#'>
          <img src={footerAppsApple} alt='' className='u-fit footer__apps-img' />
        </a>
      </div>
    </div>
    <div className='footer__lower u-clearfix u-center'>
      <p className='u-line-height-4'>
        <a href='#' className='u-ml1'>Butuh Bantuan?</a> | <a href='#'>Lihat Versi Desktop</a>
      </p>
      <p className='u-line-height-4 footer__lower-text--bigger'>
        <label htmlFor='language'>Pilih Bahasa</label>
        <select id='language' name='language' className='footer__select-language' defaultValue='id'>
          <option value='id'>Indonesia</option>
          <option value='en'>English</option>
        </select>
      </p>
      <p className='u-line-height-4 footer__lower-text--smaller'>&copy; 2009-2016, PT Tokopedia</p>
    </div>
  </div>
)

export default Footer
