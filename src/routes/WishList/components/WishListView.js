import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
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

  state = {
    page: 1,
    query: ''
  }

  constructor (props) {
    super(props)

    this.searchWishlist = this.searchWishlist.bind(this)
    this.viewMore = this.viewMore.bind(this)
  }

  searchWishlist (event) {
    this.setState({ query: event.target.value })
  }

  viewMore (event) {
    event.preventDefault()

    this.setState({ page: this.state.page + 1 }, () => {
      browserHistory.push({
        pathname: '/wishlist',
        query: { page: this.state.page }
      })
    })
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
        <div className='u-clearfix'>
          <div className='wishlist__searchbar-holder'>
            <i className='wishlist__icon wishlist__love-grey wishlist__set-love-grey' />
            <input
              type='text'
              name='searchwishlist'
              className='wishlist__searchbar'
              placeholder='Cari wishlist kamu'
              onChange={this.searchWishlist}
              value={this.state.query} />
            <span className='wishlist__count-item'>10 item</span>
          </div>
          <WishList userID={parseInt(userInfo['id'])} query={this.state.query} page={this.state.page} count={10} />
        </div>
        <LoadMore onClick={this.viewMore}>
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
