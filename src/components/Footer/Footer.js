import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Footer.scss'
import footerAppsApple from './assets/footer-apps-apple@2x.png'
import footerAppsAndroid from './assets/footer-apps-android@2x.png'

export const Footer = () => (
  <div className='footer u-clearfix'>
    <div className="footer__apps u-clearfix u-center">
      <p className="u-line-height-4 footer__apps-text">Dapatkan Aplikasi Mobile Tokopedia</p>
      <div className="u-inline-block u-px1 u-mb1">
        <a href="#">
          <img src={footerAppsApple} alt="" className="u-fit footer__apps-img"/>
        </a>
      </div>
      <div className="u-inline-block u-px1 u-mb1">
        <a href="#">
          <img src={footerAppsAndroid} alt="" className="u-fit footer__apps-img"/>
        </a>
      </div>
    </div>
    <div className="footer__lower u-clearfix u-center">
      <p className="u-line-height-4">Butuh Bantuan? <a href="#">Lihat di Sini</a> | Lihat Versi <a href="#">Desktop</a></p>
      <p className="u-line-height-4 footer__lower-text--bigger">
        Pilih Bahasa
        <select name="language" className="footer__select-language">
          <option value="" selected>Indonesia</option>
          <option value="">English</option>
        </select>
      </p>
      <p className="u-line-height-4 footer__lower-text--smaller">&copy; PT. Tokopedia</p>
    </div>
  </div>
)

export default Footer
