import React, { Component } from 'react'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'
import LoadMore from '../../../components/LoadMore'

class WishListView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
  }

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

export default WishListView
