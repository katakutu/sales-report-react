import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import queries from '../../queries'

import DigitalWidgetView from './DigitalWidgetView'
import SplashScreen from '../../components/Loading/SplashScreen'

class DigitalWidget extends Component {
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

    const operatorList = this.props.data['recharge_operator'] ? this.props.data['recharge_operator'] : []
    const productList = this.props.data['recharge_product'] ? this.props.data['recharge_product'] : []
    const categoryList = this.props.data['recharge_category'] ? this.props.data['recharge_category'] : []
    const prefixList = this.props.data['recharge_prefix'] ? this.props.data['recharge_prefix'] : []

    return (
      <DigitalWidgetView categoryList={categoryList}
        operatorList={operatorList}
        prefixList={prefixList}
        productList={productList} />
    )
  }
}

export default graphql(queries.DigitalQuery, {
  options: { returnPartialData: true }
})(DigitalWidget)
