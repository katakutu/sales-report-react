import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

import HeaderHomeOld from '../../../components/HeaderHomeOld'
import DonationTab from './DonationTab'
import DonationContent from './DonationContent'
import DonationPromo from './DonationPromo'
import DonationOperator from './DonationOperator'
import DonationSEO from './DonationSEO'
import DonationLinks from './DonationLinks'
import DonationSelectDrawer from './DonationSelectDrawer'
import SplashScreen from '../../../components/Loading/SplashScreen'
import './DonationView.scss'
import lang from '../../../lib/utils/Lang'

class DonationView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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

    return(
      <div>
        <HeaderHomeOld userInfo={userInfo} hideSearch />
        <DonationTab />
        <DonationContent />
        <DonationPromo />
        <DonationOperator />
        <DonationSEO />
        <DonationLinks />
        <DonationSelectDrawer />
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
})(connect(mapStateToProps, undefined)(DonationView))
