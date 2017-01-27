import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

import HeaderHomeOld from '../../../components/HeaderHomeOld'
import DigitalProductTab from './DigitalProductTab'
import DigitalProductPromo from './DigitalProductPromo'
import DigitalProductOperator from './DigitalProductOperator'
import DigitalProductSelectDrawer from './DigitalProductSelectDrawer'

import DigitalProductContentPulsa from './products/DigitalProductContentPulsa'
import DigitalProductContentPaketData from './products/DigitalProductContentPaketData'
import DigitalProductContent from './products/DigitalProductContent'
import DigitalProductContentMultifinance from './products/DigitalProductContentMultifinance'
import DigitalProductContentPostpaid from './products/DigitalProductContentPostpaid'
import DigitalProductContentSaldo from './products/DigitalProductContentSaldo'
import DigitalProductContentGame from './products/DigitalProductContentGame'
import DigitalProductContentBPJS from './products/DigitalProductContentBPJS'
import DigitalProductContentPDAM from './products/DigitalProductContentPDAM'
import DigitalProductContentPLN from './products/DigitalProductContentPLN'
import SplashScreen from '../../../components/Loading/SplashScreen'

class DigitalView extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object
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
    const operatorList = this.props.data['recharge_operator'] ? this.props.data['recharge_operator'] : []
    const productList = this.props.data['recharge_product'] ? this.props.data['recharge_product'] : []
    const categoryList = this.props.data['recharge_category'] ? this.props.data['recharge_category'] : []
    const bannerList = this.props.data['recharge_banner'] ? this.props.data['recharge_banner'] : []

    return (
      <div>
        <HeaderHomeOld userInfo={userInfo} hideSearch />
        <DigitalProductTab categoryList={categoryList} />
        <DigitalProductContent
          operatorList={operatorList}
          productList={productList}
          slug={this.props.params.slug}
          tab='air' />

        <DigitalProductPromo bannerList={bannerList} />
        <DigitalProductOperator operatorList={operatorList} />
        <DigitalProductSelectDrawer />
      </div>
    )
  }
}

export default graphql(queries.DigitalQuery, {
  options: { returnPartialData: true }
})(DigitalView)
