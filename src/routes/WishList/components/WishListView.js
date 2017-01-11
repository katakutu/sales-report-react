import React, { Component } from 'react'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'

class WishlistView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  render () {
    if (this.props.data.loading) {
      return (
        <SplashScreen />
      )
    }

    return (
      <div>
        <HeaderHomeOld tabIsAvailable activeTab='wishlist' />
        <WishList />
        <LoadMore>
          Lihat Selebihnya
        </LoadMore>
      </div>
    )
  }
}

export default WishlistView
