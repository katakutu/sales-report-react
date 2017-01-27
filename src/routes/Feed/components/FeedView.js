import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import Feed from './Feed'
import Inspiration from './Inspiration'
import RecentView from './RecentView'
import SplashScreen from '../../../components/Loading/SplashScreen'
import './FeedView.scss'
import queries from '../../../queries'
import lang from '../../../lib/utils/Lang'
import UserSearchID from '../../../lib/utils/UserSearchID'

import { graphql } from 'react-apollo'

const param = {
  ob: 2,
  rows: 12,
  recommendationSourceWishlist: 'wishlist',
  recommendationSourceView: 'recentview',
  recommendationSourcePurchase: 'recentpurchase',
  recommendationSize: 12
}

const TOPADS_PARAMS = {
  ep: '',
  src:'fav_product',
  item: 2,
  q: ''
}

class FeedView extends Component {
  static propTypes = {
    data: PropTypes.object,
    lang: PropTypes.string
  }

  state = {
    modalState: false
  }

  _eventModal (state) {
    this.setState({
      modalState: state
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
              recommendationSource={param.recommendationSourceView}
              recommendationSize={param.recommendationSize} />

            <Inspiration
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['INSPIRASI DARI WISHLIST']}
              recommendationSource={param.recommendationSourceWishlist}
              recommendationSize={param.recommendationSize} />

            <Inspiration
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['INSPIRASI DARI PEMBELIAN']}
              recommendationSource={param.recommendationSourcePurchase}
              recommendationSize={param.recommendationSize} />
          </div>

          <div className='bg-f8 mb-20 border-tp-ef'>
            <Feed
              ob={param.ob}
              rows={param.rows}
              start={param.rows}
              userID={parseInt(userInfo['id'])}
              title={lang[this.props.lang]['PRODUCT FEED']}
              uniqueID={UserSearchID.generateUserIDMD5(parseInt(userInfo['id']))}
              ep={TOPADS_PARAMS.ep}
              src={TOPADS_PARAMS.src}
              item={TOPADS_PARAMS.item}
              q={TOPADS_PARAMS.q}
              />
          </div>
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
