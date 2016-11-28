import React, { Component } from 'react'
import { Link } from 'react-router'
import './HeaderHome.scss'
import SearchInputOld from '../../components/SearchInputOld'
import HeaderSearchBtnCart from './assets/header-search-btn-cart@2x.png'

class HeaderHome extends Component {
  render () {
    return (
      <div className='header u-clearfix'>
        <div className='header__search u-clearfix'>
          <div className='header__search-container u-col u-col-12'>
            <SearchInputOld injectClassName='u-col-12'
              injectPlaceholder='Cari produk atau toko' />

            <Link to='/' className='header__search-btn' activeClassName='route--active'>
              <img src={HeaderSearchBtnCart} alt='' width='26' height='24' />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderHome
