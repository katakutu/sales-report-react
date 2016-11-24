import React from 'react'
import { Link } from 'react-router'
import './HeaderHome.scss'
import SearchInput from '../../components/SearchInput'
import HeaderSearchBtnCart from './assets/header-search-btn-cart@2x.png'

export const HeaderHome = () => (
  <div className='header u-clearfix'>
    <div className='header__search u-clearfix'>
      <div className='header__search-container u-col u-col-12'>
        <SearchInput injectClassName='u-col-12' injectPlaceholder='Cari produk atau toko' />
        <Link to='/' className='header__search-btn' activeClassName='route--active'>
          <img src={HeaderSearchBtnCart} alt='' width='26' height='24' />
        </Link>
      </div>
    </div>
  </div>
)

export default HeaderHome
