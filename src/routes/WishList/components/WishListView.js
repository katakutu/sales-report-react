import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'

import SplashScreen from '../../../components/Loading/SplashScreen'
import queries from '../../../queries'
import { updatePage } from '../module'

import { graphql } from 'react-apollo'

class WishlistView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string,
    location: React.PropTypes.object,
    updatePage: React.PropTypes.func
  }

  componentDidMount () {
    if (this.props.location.query && this.props.location.query.page) {
      this.props.updatePage(parseInt(this.props.location.query.page))
    }
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

const mapDispatchToProps = { updatePage }
export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(connect(undefined, mapDispatchToProps)(WishlistView))
