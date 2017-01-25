import React, { Component } from 'react'
import './DigitalWidget.scss'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import TextInput from '../../components/TextInput'
import Select from '../../components/Select'
import Label from '../../components/Label'
import DrawerContent from '../../components/DrawerContent'
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
                <Label htmlFor='no_telp'>Nomor Telepon</Label>
                <div className='u-relative dpw-input--with-image'>
                  <TextInput id='no_telp'
                    placeholder='Contoh 081234567890' />
                  <img className='dpw-operator-image' src='https://ecs7.tokopedia.net/img/recharge/operator/xl_2.png' />
                  <button className='dpw-input-clear'>Clear</button>
                </div>
              </div>
              <div className='dpw-form-group'>
                <Label htmlFor='nominal'>Nominal</Label>
                <Select id='nominal'>
                  <option value=''>Rp 25.000</option>
                  <option value=''>Rp 50.000</option>
                  <option value=''>Rp 100.000</option>
                  <option value=''>Rp 200.000</option>
                </Select>
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
        <DrawerContent title='Pilih Nominal' />
      </div>
    )
  }
}

export default DigitalWidget
