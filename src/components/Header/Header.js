import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import SearchInput from '../../components/SearchInput'
import HeaderSearchBtnCart from './assets/header-search-btn-cart@2x.png'

export const Header = () => (
  <div className='header u-clearfix'>
    <div className='header__search u-clearfix'>
      <div className='header__search-container u-col u-col-12'>
        <SearchInput injectClassName='u-col-12' injectPlaceholder='Cari produk atau toko' />
        <Link to='/' className='header__search-btn' activeClassName='route--active'>
          <img src={HeaderSearchBtnCart} alt='' width='26' height='24' />
        </Link>
      </div>
    </div>
    <ul className='u-clearfix u-list-reset u-m0'>
      <li className='u-col u-col-6 u-center'>
        <Link to='/' className='header__link' activeClassName='route--active'>
          Jelajah
        </Link>
      </li>
      <li className='u-col u-col-6 u-center'>
        <Link to='/promo' className='header__link' activeClassName='route--active'>
          Promo
        </Link>
      </li>
    </ul>
    <ul className='u-clearfix u-list-reset u-m0 u-hide'>
      <li className='u-col u-col-3 u-center'>
        <Link to='/' className='header__link' activeClassName='route--active'>
          Jelajah
        </Link>
      </li>
      <li className='u-col u-col-3 u-center'>
        <Link to='/feed' className='header__link' activeClassName='route--active'>
          Feed
        </Link>
      </li>
      <li className='u-col u-col-3 u-center'>
        <Link to='/promo' className='header__link' activeClassName='route--active'>
          Promo
        </Link>
      </li>
      <li className='u-col u-col-3 u-center'>
        <Link to='/favorit' className='header__link' activeClassName='route--active'>
          Favorit
        </Link>
      </li>
    </ul>
    <div className='u-display-none'>
      <h1>React Redux Starter Kit</h1>
      <IndexLink to='/' activeClassName='route--active'>
        Home
      </IndexLink>
      {' · '}
      <Link to='/counter' activeClassName='route--active'>
        Counter
      </Link>
    </div>
  </div>
)

export default Header
