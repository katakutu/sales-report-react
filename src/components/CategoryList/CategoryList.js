import React, { Component } from 'react'

import { HOSTNAME, SITES } from '../../constants'

import './CategoryList.scss'
import TextHeader from '../../components/TextHeader'
import icons from './icons'

const utm = '?utm_source=mobile&utm_medium=categories%20after%20log%20in'

class CategoryList extends Component {
  static propTypes = {
    categories: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  _chunkArray (arr, length) {
    let result = []
    while (arr.length) {
      result.push(arr.splice(0, length))
    }

    return result
  }

  renderCategoryItem (catItems, parentIndex) {
    return catItems.map((item, index) => {
      const key = `${item['identifier']}-${parentIndex}-${index}`
      return (
        <div className='u-col u-col-6 category-list__content' key={key}>
          <a href={`${HOSTNAME}/p/${item['identifier']}`}>
            <img src={icons[item['identifier']]} alt={`Logo kategori ${item['name']}`} />
            <span className='category-list__name'>{item['name']}</span>
          </a>
        </div>
      )
    })
  }

  renderHomeCategory () {
    /* #home-category is for editor's pick GTM */
    return (
      <div id='home-category' className='category-list__holder u-clearfix'>
        <TextHeader textType={1}>
          Pembayaran &amp; Top up
        </TextHeader>

        <div className='u-col u-col-12 category-list__box'>
          <div className='u-col u-col-6 category-list__content'>
            <a href={`${SITES['Pulsa']}${utm}&utm_campaign=pulsa%20icon`} target='_blank'>
              <img src={icons['pulsa']} alt='Logo kategori Pulsa' />
              <span className='category-list__name'>Pulsa</span>
            </a>
          </div>
          <div className='u-col u-col-6 category-list__content'>
            <a href={`${SITES['Pulsa']}/saldo/${utm}&utm_campaign=token%20listrik%20icon`} target='_blank'>
              <img src={icons['saldo']} alt='Logo kategori Saldo' />
              <span className='category-list__name'>Saldo</span>
            </a>
          </div>
        </div>

        <div className='u-col u-col-12 category-list__box'>
          <div className='u-col u-col-6 category-list__content'>
            <a href={`${SITES['Pulsa']}/paket-data/${utm}&utm_campaign=paket%20data%20icon`} target='_blank'>
              <img src={icons['paket-data']} alt='Logo kategori Paket Data' />
              <span className='category-list__name'>Paket Data</span>
            </a>
          </div>
          <div className='u-col u-col-6 category-list__content'>
            <a href={`${SITES['Pulsa']}/bpjs-kesehatan/${utm}&utm_campaign=bpjs%20kesehatan%20icon`} target='_blank'>
              <img src={icons['bpjs']} alt='Logo kategori BPJS' />
              <span className='category-list__name'>BPJS</span>
            </a>
          </div>
        </div>

        <div className='u-col u-col-12 category-list__box'>
          <div className='u-col u-col-6 category-list__content'>
            <a href={`${SITES['Pulsa']}/token-listrik/${utm}&utm_campaign=token%20listrik%20icon`} target='_blank'>
              <img src={icons['token-listrik']} alt='Logo kategori Token Listrik' />
              <span className='category-list__name'>Token Listrik</span>
            </a>
          </div>
          <div className='u-col u-col-6 category-list__content'>
            <a href={`${SITES['Tiket']}/kereta-api/${utm}&utm_campaign=tiket%20kereta%20icon`} target='_blank'>
              <img src={icons['tiket']} alt='Logo kategori Tiket' />
              <span className='category-list__name'>Tiket</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  renderCategoryList () {
    return this.props.categories.map((category, index) => {
      return (
        <div className='category-list__holder u-clearfix' key={`cat-holder-${index}`}>
          <TextHeader textType={1}>
            {category['name']}
          </TextHeader>

          {
            this._chunkArray(category.items, 2).map((items, index) => {
              const cn = category['name'].toLowerCase().replace(' ', '-')
              const key = `${cn}-${2 * index}`

              return (
                <div className='u-col u-col-12 category-list__box' key={key}>
                  { this.renderCategoryItem(items, index) }
                </div>
              )
            })
          }
        </div>
      )
    })
  }

  render () {
    return (
      <div className='u-clearfix'>
        { this.renderCategoryList() }

        {this.renderHomeCategory() }
      </div>
    )
  }
}

module.exports = CategoryList
