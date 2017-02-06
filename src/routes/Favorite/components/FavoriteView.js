import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import queries from '../../../queries'
import FavoriteNew from './FavoriteNew'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import SplashScreen from '../../../components/Loading/SplashScreen'
import './FavoriteView.scss'

const TOPADS_PARAMS = {
  ep: 'shop',
  src:'fav_shop',
  item: 2,
  q: ''
}

class FavoriteView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  static FAVORITE_PER_PAGE = 3

  state = {
    finalQuery: '',
    page: 1,
    query: '',
    refetch: false
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
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='favorite' />
        <FavoriteNew
          userID={parseInt(this.props.data.user.id)}
          count={FavoriteView.FAVORITE_PER_PAGE}
          shop={''}
          ep={TOPADS_PARAMS.ep}
          src={TOPADS_PARAMS.src}
          item={TOPADS_PARAMS.item}
          q={TOPADS_PARAMS.q} />
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
})(connect(mapStateToProps, undefined)(FavoriteView))
