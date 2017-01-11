import React, { Component } from 'react'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'

class WishlistView extends Component {
  render () {
    return (
      <div>
        <HeaderHomeOld />
        <WishList />
        <LoadMore>
          Lihat Selebihnya
        </LoadMore>
      </div>
    )
  }
}

export default WishlistView
