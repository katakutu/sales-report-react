import React, { Component } from 'react'
import './Footer.scss'
import footerAppsApple from './assets/footer-apps-apple@2x.png'
import footerAppsAndroid from './assets/footer-apps-android@2x.png'

import Cookies from '../../lib/utils/Cookies'
import langEn from '../../lib/utils/lang_en-min.js'
import langId from '../../lib/utils/lang_id-min.js'
import { DESKTOP_HOSTNAME, HOSTNAME } from '../../constants'

var lang = {
  "id":langId,
  "en":langEn
}

class Footer extends Component {
  state = {
    language: (Cookies.getItem('lang')) ? Cookies.getItem('lang') : 'id'
  }

  constructor (props) {
    super(props)

    this.languageChange = this.languageChange.bind(this)
  }

  languageChange (event) {
    const lang = event.target.value
    this.setState({ language: lang }, () => Cookies.setItem('lang', lang))
  }

  render () {
    let l = this.state.language
    return (
      <div className='footer u-clearfix'>
        <div className='footer__apps u-clearfix u-center'>
          <p className='u-line-height-4 footer__apps-text'>Dapatkan Aplikasi Mobile Tokopedia</p>
          <div className='u-inline-block u-px1 u-mb1'>
            <a href='https://play.google.com/store/apps/details?id=com.tokopedia.tkpd'>
              <img src={footerAppsAndroid} alt='' className='u-fit footer__apps-img' />
            </a>
          </div>
          <div className='u-inline-block u-px1 u-mb1'>
            <a href='https://itunes.apple.com/us/app/tokopedia/id1001394201?ls=1&mt=8'>
              <img src={footerAppsApple} alt='' className='u-fit footer__apps-img' />
            </a>
          </div>
        </div>
        <div className='footer__lower u-clearfix u-center'>
          <p className='u-line-height-4'>
            <a href={`${HOSTNAME}/bantuan`} className='u-ml1'>{
              lang[l]["Need Help"]
            }?</a>
            &nbsp; | &nbsp;
        <a href={DESKTOP_HOSTNAME}>{
          lang[l]["Desktop Site"]
        }</a>
          </p>
          <p className='u-line-height-4 footer__lower-text--bigger'>
            <label htmlFor='language'>{
              lang[l]["Choose Language"]
            }</label>
            <select id='language'
              name='language'
              className='footer__select-language'
              value={this.state.language}
              onChange={this.languageChange}>
              <option value='id'>Indonesia</option>
              <option value='en'>English</option>
            </select>
          </p>
          <p className='u-line-height-4 footer__lower-text--smaller'>&copy; 2009-2016, PT Tokopedia</p>
        </div>
      </div>
    )
  }
}

export default Footer
