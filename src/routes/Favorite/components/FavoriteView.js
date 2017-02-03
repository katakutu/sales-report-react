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
  src:'fav_product',
  item: 4,
  q: ''
}

class FavoriteView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    hasNextPage: React.PropTypes.bool,
    lang: React.PropTypes.string,
    totalFavorite: React.PropTypes.number,
    favorites: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  static FAVORITE_PER_PAGE = 10

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
          userID={parseInt(userInfo['id'])}
          query={this.state.finalQuery}
          page={this.state.page}
          count={FavoriteView.FAVORITE_PER_PAGE}
          shouldRefetch={this.state.refetch}
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
    lang: state['app'] ? state['app'].lang : state.lang,
    hasNextPage: state['favorite'] ? state['favorite'].hasNextPage : state.hasNextPage,
    totalWishlist: state['favorite'] ? state['favorite'].totalWishlist : state.totalFavorite,
    favorites: state['favorite'] ? state['favorite'].favorites : state.favorites
  }
}

export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, undefined)(FavoriteView))
