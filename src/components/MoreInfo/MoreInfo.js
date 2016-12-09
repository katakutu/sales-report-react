import React, { Component } from 'react'
import './MoreInfo.scss'

import { HOSTNAME, SITES } from '../../constants'

class MoreInfo extends Component {
  state = {
    show: false
  }

  constructor (props) {
    super(props)

    this.toggleContent = this.toggleContent.bind(this)
  }

  toggleContent () {
    this.setState({ show: !this.state.show })
  }

  render () {
    const mainArrow = this.state.show ? 'more-info__arrow-up' : 'more-info__arrow-down'
    const listStyle = this.state.show ? { height: 'auto' } : {
      display: 'none',
      height: 0
    }

    return (
      <div className='more-info u-clearfix'>
        <div className='u-col-12 more-info__holder'>
          <button className='u-col-12 u-block more-info__header more-info__link'
            onClick={this.toggleContent}>
            Info Selengkapnya
            <i className={`more-info__arrow ${mainArrow}`} />
          </button>
          <ul className='u-list-reset more-info__content u-p0 u-m0' style={listStyle}>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/bebas-penipuan`}>
                Belanja di Tokopedia
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/jualan-online`}>
                Jualan di Tokopedia
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Tiket']}/kereta-api/`}>
                Pesan Tiket Kereta
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Pulsa']}`}>
                Isi Ulang Pulsa
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${SITES['Events']}`}>
                Kegiatan Kami
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
                Tentang Kami
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/careers`}>
                Karir
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
                Syarat & Ketentuan
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/privacy.pl`}>
                Kebijakan Privasi
            <i className='more-info__arrow' />
              </a>
            </li>
            <li>
              <a className='more-info__link' href={`${HOSTNAME}/bantuan`}>
                Hubungi Kami
            <i className='more-info__arrow' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MoreInfo
