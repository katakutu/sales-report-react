import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
import PromoBanner from '../../../components/PromoBanner'
import Ticker from '../../../components/Ticker'

class HomeView extends Component {
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
    return (
      <div>
        <Ticker />
        <Carousel />
        <PromoSpacer />
        <PromoBanner
          imageUrl='https://placehold.it/414x90'
          targetUrl='https://tokopedia.com'
          imageAlt='Lorem ipsum' />
        <CategoryList />
        <OfficialStoreSection />
      </div>
    )
  }
}

export default HomeView
