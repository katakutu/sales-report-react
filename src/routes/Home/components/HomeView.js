import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import PromoSpacer from '../../../components/PromoSpacer'
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
        <CategoryList />
      </div>
    )
  }
}

export default HomeView
