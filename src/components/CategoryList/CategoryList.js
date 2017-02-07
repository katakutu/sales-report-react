// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import languageTypes from '../../lib/utils/languageTypes'
import './CategoryList.scss'
import TextHeader from '../../components/TextHeader'
import lang from '../../lib/utils/Lang'
import ArrayHelper from '../../lib/utils/ArrayHelper'
import GTM from '../../lib/utils/GTM'


const gtmNotifyCategoryClicked = ({ name }) => () => {
  GTM.pushEvent('clickKategori', 'Kategori', 'Click', name)
}

class CategoryList extends Component {

  props: {
    categories: Object[],
    lang: string,
  }


  renderCategoryItem = catItems => catItems.map(item => (
    <div className='u-col u-col-6 category-list__content' key={item.identifier}>
      <a href={item.url} onClick={gtmNotifyCategoryClicked(item)}>
        <div className='category-list__content-image'>
          <img src={item.imageURI} alt={`Logo kategori ${item.name}`} />
        </div>
        <div className='category-list__content-link'>
          <span className='category-list__name'>
            { lang[this.props.lang || languageTypes[0]][item.name] || item.name }
          </span>
        </div>
      </a>
    </div>
    ))

  renderCategoryList= () => this.props.categories.map(category => (
    <div className='category-list__holder u-clearfix' key={category.name}>
      <TextHeader textType={1}>
        {lang[this.props.lang][category.name]}
      </TextHeader>

      {
        ArrayHelper.chunk(category.items, 2).map((items) => {
          const key = items.reduce((sum, value) => `${sum}_${value.name}`, '')
          return (
            <div className='u-col u-col-12 category-list__box' key={key}>
              { this.renderCategoryItem(items) }
            </div>
          )
        })
      }
    </div>
      ))

  render() {
    return (
      <div className='u-clearfix'>
        { this.renderCategoryList() }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  lang: state.app ? state.app.lang : state.lang,
})
module.exports = connect(mapStateToProps, undefined)(CategoryList)
