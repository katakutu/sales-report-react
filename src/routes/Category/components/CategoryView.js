import React, { Component } from 'react'
import './CategoryView.scss'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import CatalogCategory from '../../../components/CatalogCategory'

class CategoryView extends Component {
  render () {
    return (
      <div>
        <HeaderHomeOld />
        <CatalogCategory />
      </div>
    )
  }
}

export default CategoryView
