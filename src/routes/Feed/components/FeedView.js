import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import Feed from './Feed'
import SplashScreen from '../../../components/Loading/SplashScreen'
import './FeedView.scss'
import queries from '../../../queries'
import lang from '../../../lib/utils/Lang'

import { graphql } from 'react-apollo'

class FeedView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  state = {
    query: ''
  }

  constructor (props) {
    super(props)
    
  }

  render () {
    // if (this.props.data.loading) {
    //   return (
    //     <SplashScreen />
    //   )
    // }

    const user = this.props.data.user || {}
    const userInfo = Object.assign(user, {
    //   'deposit': this.props.data.saldo,
    //   'points': this.props.data.points,
    //   'notifications': this.props.data.notifications.data,
    //   'shop': this.props.data.shop,
    //   'wallet': this.props.data.wallet
    })

    return (
      <div>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='feed' />
        <div className='u-clearfix hotlist hotlist--single-page u-mt2'>
          <Feed />
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
