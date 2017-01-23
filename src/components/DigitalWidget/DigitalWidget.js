import React, { Component } from 'react'
import './DigitalWidget.scss'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
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
                  <i className='dpw-tab__normalizer' />
                </a>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Data</label>
                  <i className='dpw-tab__normalizer' />
                </a>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Saldo</label>
                  <i className='dpw-tab__normalizer' />
                </a>
              </li>
              <li className='dpw-tab__item dpw-grid-1-4 smaller'>
                <a href='#' className='dpw-tab__link'>
                  <label className='dpw-tab__label' href='#'>Listrik <br /> PLN</label>
                  <i className='dpw-tab__normalizer' />
                </a>
              </li>
            </ul>
            <button className='dpw-others__btn'>
              <i className='dpw-others__icon' />
            </button>
          </div>
          <div className='dpw-content u-clearfix'>
            <form action='#'>
              <div className='dpw-form-group'>
                <label htmlFor='' className='dpw-label'>Nomor Telepon</label>
                <input type='text' className='dpw-input' placeholder='Contoh: 081234567890' />
              </div>
              <div className='dpw-form-group'>
                <label htmlFor='' className='dpw-label'>Nominal</label>
                <select name='' id=''className='dpw-select'>
                  <option value=''>Rp 25.000</option>
                  <option value=''>Rp 50.000</option>
                  <option value=''>Rp 100.000</option>
                </select>
              </div>
              <div className='dpw-form-group'>
                <Checkbox>Bayar Instan</Checkbox>
              </div>
              <Button className={classNames('btn--orange', 'btn--block')}
                buttonType='submit'>
                Beli
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalWidget
