import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import queries from '../../../queries'
import { SLUG } from '../digitalconstants'
import { SITES } from '../../../constants'

import HeaderHomeOld from '../../../components/HeaderHomeOld'
import Tab from './Tab'
import Content from './Content'
import Promo from './Promo'
import Operator from './Operator'

import SplashScreen from '../../../components/Loading/SplashScreen'

class DonasiView extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'donasi'
    }

    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (name) {
    this.setState({ activeTab: name })
  }

  render () {
    if (this.props.data.loading) {
      return (
        <SplashScreen />
      )
    }

    if (!SLUG[this.state.activeTab]) {
      window.location = SITES['Pulsa'] + '/' + this.state.activeTab
      return
    }

    const user = this.props.data.user || {}
    const userInfo = Object.assign(user, {
      'deposit': this.props.data.saldo,
      'points': this.props.data.points,
      'notifications': this.props.data.notifications.data,
      'shop': this.props.data.shop,
      'wallet': this.props.data.wallet
    })
    const operatorList = this.props.data['recharge_operator'] ? this.props.data['recharge_operator'] : []
    const productList = this.props.data['recharge_product'] ? this.props.data['recharge_product'] : []
    const categoryList = this.props.data['recharge_category'] ? this.props.data['recharge_category'] : []
    const bannerList = this.props.data['recharge_banner'] ? this.props.data['recharge_banner'] : []

    return (
      <div>
        <HeaderHomeOld userInfo={userInfo} hideSearch />
        <Tab categoryList={categoryList} activeTab={this.state.activeTab} changeTab={this.changeTab} />
        <Content
          operatorList={operatorList}
          productList={productList}
          slug={this.props.params.slug}
          tab={this.state.activeTab} />

        <Promo bannerList={bannerList} />
        <Operator operatorList={operatorList} />
      </div>
    )
  }
}

export default graphql(queries.DigitalQuery, {
  options: { returnPartialData: true }
})(DonasiView)
