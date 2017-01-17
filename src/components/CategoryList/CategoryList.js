import React, { Component } from 'react'
import { connect } from 'react-redux'

import './CategoryList.scss'
import TextHeader from '../../components/TextHeader'
import lang from '../../lib/utils/Lang'
import ArrayHelper from '../../lib/utils/ArrayHelper'
import GTM from '../../lib/utils/GTM'

class CategoryList extends Component {
  static propTypes = {
    categories: React.PropTypes.arrayOf(React.PropTypes.object),
    lang: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this._gtmNotifyCategoryClicked = this._gtmNotifyCategoryClicked.bind(this)
    this.renderCategoryItem = this.renderCategoryItem.bind(this)
    this.renderCategoryList = this.renderCategoryList.bind(this)
  }

  _gtmNotifyCategoryClicked (item) {
    return (event) => {
      GTM.pushEvent('clickKategori', 'Kategori', 'Click', item['name'])
    }
  }

  renderCategoryItem (catItems, parentIndex) {
    return catItems.map((item, index) => {
      const key = `${item['identifier']}-${parentIndex}-${index}`
      return (
        <div className='u-col u-col-6 category-list__content' key={key}>
          <a href={item['url']} onClick={this._gtmNotifyCategoryClicked(item)}>
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
            ArrayHelper.chunk(category.items, 2).map((items, index) => {
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
