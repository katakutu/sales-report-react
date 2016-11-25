import React, { Component } from 'react'
import './HomeView.scss'
import HeaderHome from '../../../components/HeaderHome'
import Carousel from '../../../components/Carousel'
import SectionSpacer from '../../../components/SectionSpacer'
import CategoryList from '../../../components/CategoryList'
import CatalogCategory from '../../../components/CatalogCategory'
import Ticker from '../../../components/Ticker'
import Tabs from '../../../components/Tabs/Tabs'
import Tab from '../../../components/Tabs/Tab'

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
        <HeaderHome />
        <Tabs index={this.state.activeTabIndex} onChange={this.handleTabChange}>
          <Tab label='Jelajah'>
            <Ticker perTickDuration={2} />
            <Carousel />
            <SectionSpacer>
              <i className='section-spacer__icon section-spacer__icon--percent' />
              Lihat Semua Promo
              <i className='section-spacer__icon section-spacer__icon--chevron' />
            </SectionSpacer>
            <CategoryList />
            <CatalogCategory />
          </Tab>
          <Tab label='Promo'>
            <h2 style={{ 'text-align': 'center' }}>PROMO!</h2>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export const HomeView = () => (
  <div>
    <Carousel />
    <SectionSpacer>
      <i className='section-spacer__icon section-spacer__icon--percent' />
      Lihat Semua Promo
      <i className='section-spacer__icon section-spacer__icon--chevron' />
    </SectionSpacer>
    <CategoryList />
    <CatalogCategory />
    <div className='u-display-none'>
      <h4>Welcome!</h4>
      <img
        alt='This is a duck, because Redux!'
        className='duck'
        src={DuckImage} />
    </div>
  </div>
)

export default HomeView
