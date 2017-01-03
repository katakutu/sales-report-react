import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
import Ticker from '../../../components/Ticker'
import HotList from '../../../components/HotList'
import MoreInfo from '../../../components/MoreInfo'
import SplashScreen from '../../../components/Loading/SplashScreen'
import { graphql } from 'react-apollo'
import queries from '../../../queries'
import Toppicks from '../../../components/Toppicks'
import RecommendationProduct from '../../../components/RecommendationProduct'

class HomeView extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  state = {
    activeTabIndex: 0
  }

  constructor (props) {
    super(props)

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (index) {
    this.setState({ activeTabIndex: index })
  }

  render () {
    if (this.props.data.loading) {
      return (
        <SplashScreen />
      )
    }

    const slides = this.props.data.slides ? this.props.data.slides.slides : []
    const tickers = this.props.data.ticker ? this.props.data.ticker.tickers : []

    const defaultHotlist = { success: 0, message_status: 1, data: [] }
    const hotlists = this.props.data['hot_product_home'] ? this.props.data['hot_product_home'] : defaultHotlist

    const categories = this.props.data.category ? this.props.data.category.categories : []

    return (
      <div>
        <HeaderHomeOld userInfo={this.props.data.user} tabIsAvailable activeTab='home' />

        <Ticker tickers={tickers} perTickDuration={5} />
        <Carousel images={slides} />
        <PromoSpacer />
        <div id='widget-dmw' className='u-clearfix u-my2' /> { /* Pulsa widget container */ }
        <CategoryList categories={categories} />
        <HotList data={hotlists} />
        <Toppicks />
        <RecommendationProduct />
        <OfficialStoreSection />
        <MoreInfo />
      </div>
    )
  }
}

export default graphql(queries.HomeQuery, {
  options: { returnPartialData: true }
})(HomeView)
