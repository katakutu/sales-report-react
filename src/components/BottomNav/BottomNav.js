import React from 'react'
import { Link } from 'react-router'
import './BottomNav.scss'

export const BottomNav = () => (
  <div className='bottom-nav u-clearfix'>
    <ul className='u-clearfix u-list-reset u-m0'>
      <li className='bottom-nav__grid u-col u-center'>
        <Link to='/' className='bottom-nav__link' activeClassName='route--active'>
          <span className='bottom-nav__icon bottom-nav__icon--home' />
          <span className='u-mx-auto'>Home</span>
        </Link>
      </li>
      <li className='bottom-nav__grid u-col u-center'>
        <Link to='/hotlist' className='bottom-nav__link' activeClassName='route--active'>
          <span className='bottom-nav__icon bottom-nav__icon--hotlist' />
          <span className='u-mx-auto'>Hotlist</span>
        </Link>
      </li>
      <li className='bottom-nav__grid u-col u-center'>
        <Link to='/wishlist' className='bottom-nav__link' activeClassName='route--active'>
          <span className='bottom-nav__icon bottom-nav__icon--wishlist' />
          <span>Wishlist</span>
        </Link>
      </li>
<<<<<<< HEAD
      <li className="bottom-nav__grid u-col u-center">
        <Link to='/masuk' className="bottom-nav__link" activeClassName='route--active'>
          <span className="bottom-nav__icon bottom-nav__icon--masuk"></span>
=======
      <li className='bottom-nav__grid u-col u-center'>
        <Link to='/notifikasi' className='bottom-nav__link' activeClassName='route--active'>
          <span className='bottom-nav__icon bottom-nav__icon--notifikasi' />
          <span>Notifikasi</span>
        </Link>
      </li>
      <li className='bottom-nav__grid u-col u-center'>
        <Link to='/masuk' className='bottom-nav__link' activeClassName='route--active'>
          <span className='bottom-nav__icon bottom-nav__icon--masuk' />
>>>>>>> upstream/master
          <span>Masuk</span>
        </Link>
      </li>
    </ul>
  </div>
)

export default BottomNav
