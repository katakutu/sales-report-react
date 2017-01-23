import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

import HeaderHomeOld from '../../../components/HeaderHomeOld'
import DigitalProductTab from './DigitalProductTab'
import DigitalProductContent from './DigitalProductContent'
import DigitalProductPromo from './DigitalProductPromo'
import DigitalProductOperator from './DigitalProductOperator'
import DigitalProductSEO from './DigitalProductSEO'
import DigitalProductLinks from './DigitalProductLinks'
import DigitalProductSelectDrawer from './DigitalProductSelectDrawer'
import SplashScreen from '../../../components/Loading/SplashScreen'
import lang from '../../../lib/utils/Lang'

class DigitalView extends Component {
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
        <DigitalProductTab />
        <DigitalProductContent />
        <DigitalProductPromo />
        <DigitalProductOperator />
        <DigitalProductSEO />
        <DigitalProductLinks />
        <DigitalProductSelectDrawer />
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
})(connect(mapStateToProps, undefined)(DigitalView))
