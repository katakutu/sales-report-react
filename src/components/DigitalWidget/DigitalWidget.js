/* global $ */
import React, { Component } from 'react'
import './DigitalWidget.scss'
import classNames from 'classnames'

class DigitalWidget extends Component {
  render () {
    return (
      <div className='digital-product-widget u-clearfix'>
        <div className='dpw-container u-clearfix'>
          <div className='dpw-header u-clearfix'>
            <ul className='dpw-tab'>
              <li className='dpw-tab__item dpw-grid-1-4 active'>
                <a className='dpw-tab__link' href='#'>Pulsa</a>
                <i className='dpw-tab__normalizer'></i>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4'>
                <a className='dpw-tab__link' href='#'>Data</a>
                <i className='dpw-tab__normalizer'></i>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4'>
                <a className='dpw-tab__link' href='#'>Saldo</a>
                <i className='dpw-tab__normalizer'></i>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4'>
                <a className='dpw-tab__link' href='#'>Listrik</a>
                <i className='dpw-tab__normalizer'></i>
              </li>
            </ul>
            <div className='dpw-others__btn'>
              <i className='dpw-others__icon'></i>
            </div>
          </div>
          <div className='dpw-content'>
            <form action='#'>
              <div className='dpw-form-group'>
                Content goes here
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalWidget
