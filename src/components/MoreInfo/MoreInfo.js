import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MoreInfo.scss'

import { HOSTNAME, SITES } from '../../constants'
import lang from '../../lib/utils/Lang'

class MoreInfo extends Component {
  static propTypes = {
    updateLang: React.PropTypes.func,
    lang: React.PropTypes.string
  }

  state = {
    show: true
  }

  constructor (props) {
    super(props)

    this.toggleContent = this.toggleContent.bind(this)
  }

  toggleContent () {
    this.setState({ show: !this.state.show })
  }

  render () {
    const listStyle = this.state.show ? { height: 'auto' } : {
      display: 'none',
      height: 0
    }

    return (
      <div className='more-info u-clearfix'>
        <div className='u-col-12 more-info__holder'>
          <ul className='u-list-reset more-info__content u-p0 u-m0' style={listStyle}>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/bebas-penipuan`}>
                { lang[this.props.lang]['Why Buy on Tokopedia'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/jualan-online`}>
                { lang[this.props.lang]['Why Sell on Tokopedia'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Tiket']}/kereta-api/`}>
                { lang[this.props.lang]['RESERVE_TRAIN_TICKET'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Pulsa']}`}>
                { lang[this.props.lang]['BUY_RECHARGE'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Events']}`}>
                { lang[this.props.lang]['Events'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Seller']}`}>
                Seller Center
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/about`}>
                { lang[this.props.lang]['About Us'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/careers`}>
                { lang[this.props.lang]['Career'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Blog']}`}>
                Blog
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/terms.pl`}>
                { lang[this.props.lang]['term & condition'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/privacy.pl`}>
                { lang[this.props.lang]['Privacy Policy'] }
                <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/bantuan?utm_source=mobile&utm_medium=linkbantuan`}>
                { lang[this.props.lang]['Contact Us'] }
                <i className='more-info__arrow' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default connect(mapStateToProps, undefined)(MoreInfo)
