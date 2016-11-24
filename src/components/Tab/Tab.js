import React, { Component } from 'react'
import { Link } from 'react-router'
import './Tab.scss'

class Tab extends Component {
  render () {
    return (
      <ul className='tab u-clearfix u-list-reset u-m0'>
        <li className='u-col u-col-6 u-center'>
          <Link to='/' className='tab__link' activeClassName='route--active'>
          Jelajah
        </Link>
        </li>
        <li className='u-col u-col-6 u-center'>
          <Link to='/promo' className='tab__link' activeClassName='route--active'>
          Promo
        </Link>
        </li>
      </ul>
    )
  }
}

export default Tab
