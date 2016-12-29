import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HOSTNAME } from '../../constants'

import './CategoryList.scss'
import TextHeader from '../../components/TextHeader'
import lang from '../../lib/utils/Lang'

class CategoryList extends Component {
  static propTypes = {
    categories: React.PropTypes.arrayOf(React.PropTypes.object),
    lang: React.PropTypes.string
  }

  _chunkArray (arr, length) {
    let result = []
    let copy = arr.slice()
    while (copy.length) {
      result.push(copy.splice(0, length))
    }

    return result
  }

  renderCategoryItem (catItems, parentIndex) {
    return catItems.map((item, index) => {
      const key = `${item['identifier']}-${parentIndex}-${index}`
      return (
        <div className='u-col u-col-6 category-list__content' key={key}>
          <a href={`${HOSTNAME}/p/${item['identifier']}`}>
            <div className='category-list__content-image'>
              <img src={item['imageURI']} alt={`Logo kategori ${item['name']}`} />
            </div>
            <div className='category-list__content-link'>
              <span className='category-list__name'>
                { lang[this.props.lang][item['name']] || item['name'] }
              </span>
            </div>
          </a>
        </div>
      )
    })
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
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
module.exports = connect(mapStateToProps, undefined)(CategoryList)
