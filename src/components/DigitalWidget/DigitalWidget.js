/* global $ */
import React, { Component } from 'react'
import './DigitalWidget.scss'
import Button from '../../components/Button'
import classNames from 'classnames'

class DigitalWidget extends Component {
  render () {
    return (
      <div className='digital-product-widget u-clearfix'>
        <div className='dpw-container u-clearfix'>
          <div className='dpw-header u-clearfix'>
            <ul className='dpw-tab u-clearfix'>
              <li className='dpw-tab__item dpw-grid-1-4 active'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Pulsa</label>
                  <i className='dpw-tab__normalizer'></i>
                </a>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4 smaller'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Paket Data</label>
                  <i className='dpw-tab__normalizer'></i>
                </a>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Saldo</label>
                  <i className='dpw-tab__normalizer'></i>
                </a>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4 smaller'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Listrik PLN</label>
                  <i className='dpw-tab__normalizer'></i>
                </a>
              </li>
            </ul>
            <button className='dpw-others__btn'>
              <i className='dpw-others__icon'></i>
            </button>
          </div>
          <div className='dpw-content u-clearfix'>
            <form action='#'>
              <div className='dpw-form-group'>
                <Button className={classNames('btn--orange', 'btn--block')}
                  buttonType='submit'>
                  Beli
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalWidget
