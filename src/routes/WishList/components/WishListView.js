import React, { Component } from 'react'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'

import SplashScreen from '../../../components/Loading/SplashScreen'
import queries from '../../../queries'

import { graphql } from 'react-apollo'

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

    const user = this.props.data.user || {}
    const userInfo = Object.assign(user, {
      'deposit': this.props.data.saldo,
      'points': this.props.data.points,
      'notifications': this.props.data.notifications.data,
      'shop': this.props.data.shop,
      'wallet': this.props.data.wallet
    })

    return (
      <div id='wishlist-view-container'>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='wishlist' />
        <WishList userID={parseInt(userInfo['id'])} />
      </div>
    )
  }
}

export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(WishlistView)
