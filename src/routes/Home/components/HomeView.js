import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
import Ticker from '../../../components/Ticker'
import MoreInfo from '../../../components/MoreInfo'
import SplashScreen from '../../../components/Loading/SplashScreen'
import Toppicks from '../../../components/Toppicks'
import RecommendationProduct from '../../../components/RecommendationProduct'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

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

  componentDidMount () {
    const pulsaWidget = document.querySelector('#widget-dmw')
    const pulsaWidgetContent = (pulsaWidget && pulsaWidget.textContent) || ''

    if (window.recharge_init_category && pulsaWidgetContent === '') {
      window.recharge_init_category()
    }
  }

  componentDidUpdate () {
    const pulsaWidget = document.querySelector('#widget-dmw')

    // for GTM to consume
    if (pulsaWidget && pulsaWidget.textContent === '') {
      try {
        const event = new Event('HomePulsaWidgetReady')
        document.dispatchEvent(event)
      } catch (e) {
        console.error(e)

        const oldEvent = document.createEvent('Event')
        oldEvent.initEvent('HomePulsaWidgetReady', true, true)

        document.dispatchEvent(oldEvent)
      }
    }
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

    const defaultHotlist = { curr_page: 0, max_page: 0, per_page: 0, items: [] }
    const hotlists = this.props.data['hot_product_home'] ? this.props.data['hot_product_home'] : defaultHotlist

    const toppicks = this.props.data['toppicks'] ? this.props.data['toppicks'] : []
    const officialStores = this.props.data['official_store'] ? this.props.data['official_store'] : []

    const categories = this.props.data.category ? this.props.data.category.categories : []

    const user = this.props.data.user || {}
    const userInfo = Object.assign(user, {
      'deposit': this.props.data.saldo,
      'points': this.props.data.points,
      'notifications': this.props.data.notifications.data,
      'shop': this.props.data.shop,
      'wallet': this.props.data.wallet
    })

    const shouldShowToppicks = toppicks.length > 0 && toppicks[0]['toppicks'].length > 0
    const shouldShowOffStore = officialStores.length > 0

    return (
      <div>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='home' />

        <Ticker tickers={tickers} perTickDuration={5} />
        <Carousel images={slides} />
        <PromoSpacer />
        <div id='widget-dmw' className='u-clearfix u-my2' /> { /* Pulsa widget container */ }
        <CategoryList categories={categories} />
        { shouldShowToppicks && <Toppicks data={toppicks} /> }
        <RecommendationProduct data={hotlists} />
        { shouldShowOffStore && <OfficialStoreSection data={officialStores} /> }
        <MoreInfo />
      </div>
    )
  }
}

export default graphql(queries.HomeQuery, {
  options: { returnPartialData: true }
})(HomeView)
