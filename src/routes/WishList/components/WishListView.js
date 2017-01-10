import React, { Component } from 'react'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'
import LoadMore from '../../../components/LoadMore'

class WishListView extends Component {
  render () {
    return (
      <div>
        <HeaderHomeOld />
        <WishList />
        <LoadMore />
      </div>
    )
  }
}

export default WishListView
