import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Footer.scss'
import footerAppsApple from './assets/footer-apps-apple@2x.png'
import footerAppsAndroid from './assets/footer-apps-android@2x.png'

import Cookies from '../../lib/utils/Cookies'
import lang from '../../lib/utils/Lang'
import { updateLang } from '../../store/app'
import { DESKTOP_HOSTNAME, HOSTNAME } from '../../constants'

class Footer extends Component {
  static propTypes = {
    updateLang: React.PropTypes.func,
    lang: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this.languageChange = this.languageChange.bind(this)
  }

  languageChange (event) {
    const newLang = event.target.value
    this.setState({ language: newLang }, () => {
      let domain = location.hostname
      if (window.location.href.indexOf('ndvl') > -1) {
        domain = /(\..*\.ndvl)/.exec(location.hostname)[1]
      } else if (window.location.href.indexOf('localhost') > -1) {
        domain = /(localhost)/.exec(location.hostname)[1]
      } else if (window.location.href.indexOf('ndvl') < 0) {
        domain = /(\..*\.com)/.exec(location.hostname) &&
          /(\..*\.com)/.exec(location.hostname)[1] ||
          location.hostname
      }

      Cookies.setItem('lang', newLang, 31536000, '/', domain, true)
    })
    this.props.updateLang(newLang)
  }

  render () {
    return (
      <div className='footer u-clearfix'>
        <div className='footer__apps u-clearfix u-center'>
          <p className='u-line-height-4 footer__apps-text'>
            { lang[this.props.lang]['Download Tokopedia Mobile Apps'] }
          </p>
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
            <a href={`${HOSTNAME}/bantuan?utm_source=mobile&utm_medium=linkbantuan`} className='u-ml1'>
              {
              lang[this.props.lang]['Need Help']
            }?</a>
            &nbsp; | &nbsp;
        <a href={DESKTOP_HOSTNAME}>{
          lang[this.props.lang]['Desktop Site']
        }</a>
          </p>
          <p className='u-line-height-4 footer__lower-text--bigger'>
            <label htmlFor='language'>{
              lang[this.props.lang]['Choose Language']
            }</label>
            <select id='language'
              name='language'
              className='footer__select-language'
              value={this.props.lang}
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

const mapDispatchToProps = {
  updateLang
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
