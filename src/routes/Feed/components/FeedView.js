import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import Feed from './Feed'
import Inspiration from './Inspiration'
import RecentView from './RecentView'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'
import './FeedView.scss'
import queries from '../../../queries'
import lang from '../../../lib/utils/Lang'
import UserSearchID from '../../../lib/utils/UserSearchID'

import { graphql } from 'react-apollo'

const param = {
  ob: 2,
  rows: 12,
  shopId: '478592,124630',
  recommendationSourceWishlist: 'wishlist',
  recommendationSourceView: 'recentview',
  recommendationSourcePurchase: 'recentpurchase',
  recommendationSize: 12
}

class FeedView extends Component {
  static propTypes = {
    data: PropTypes.object,
    lang: PropTypes.string
  }

  state = {
    page: 1
  }

  constructor (props) {
    super(props)

    this.viewMore = this.viewMore.bind(this)
  }

  viewMore (event) {
    event.preventDefault()

    this.setState({ page: this.state.page + 1 }, () => {
      browserHistory.push({
        pathname: '/feed',
        query: { page: this.state.page + 1 }
      })
    })
  }

  render () {
    if (this.props.data.loading) {
      return (
        <SplashScreen />
      )
    }
    console.log(this.state.page)
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
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='feed' />
        <div className='mb20 tabs-container'>
          <div className='bg-f8 mb-20 border-bt-ef'>
            <RecentView
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['TERAKHIR DILIHAT']}
            />

            <Inspiration
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['INSPIRASI DARI MINAT ANDA']}
              // userID={param.userID}
              recommendationSource={param.recommendationSourceView}
              recommendationSize={param.recommendationSize} />

            <Inspiration
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['INSPIRASI DARI WISHLIST']}
              // userID={param.userID}
              recommendationSource={param.recommendationSourceWishlist}
              recommendationSize={param.recommendationSize} />

            <Inspiration
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['INSPIRASI DARI PEMBELIAN']}
              // userID={param.userID}
              recommendationSource={param.recommendationSourcePurchase}
              recommendationSize={param.recommendationSize} />
          </div>

          <div className='bg-f8 mb-20 border-tp-ef'>
            <Feed
              ob={param.ob}
              start={this.state.page}
              rows={param.rows}
              userID={param.userID}
              title={lang[this.props.lang]['PRODUCT FEED']}
              uniqueID={UserSearchID.generateUserIDMD5(parseInt(userInfo['id']))} />
          </div>

          <LoadMore onClick={this.viewMore}>
            { lang[this.props.lang]['View More'] }
          </LoadMore>

        </div>
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
})(connect(mapStateToProps, undefined)(FeedView))
