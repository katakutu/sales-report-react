import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'
import queries from '../../../queries'
import lang from '../../../lib/utils/Lang'

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
      <div>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='wishlist' />
        <WishList userID={parseInt(userInfo['id'])} page={1} count={10} />
        <LoadMore>
          { lang[this.props.lang]['View More'] }
        </LoadMore>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, undefined)(WishlistView))
