import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

import HotList from './HotList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'
import './HotListView.scss'
import lang from '../../../lib/utils/Lang'

class HotListView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
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
        pathname: '/hot',
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
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='hotlist' />
        <div className='u-clearfix hotlist hotlist--single-page u-mt2'>
          <HotList page={this.state.page} />
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

export default graphql(queries.HotlistQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, undefined)(HotListView))
