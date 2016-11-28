import React, { Component } from 'react'
import './HomeView.scss'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
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
        <HeaderHomeOld />
        <Ticker />
        <Carousel />
        <CategoryList />
      </div>
    )
  }
}

export default HomeView
