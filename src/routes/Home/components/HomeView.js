import React, { Component } from 'react'
import './HomeView.scss'
import HeaderHome from '../../../components/HeaderHome'
import Carousel from '../../../components/Carousel'
import SectionSpacer from '../../../components/SectionSpacer'
import CategoryList from '../../../components/CategoryList'
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
          <Tab label='Home'>
            <Ticker perTickDuration={2} />

            <Carousel />

            <SectionSpacer>
              <i className='section-spacer__icon section-spacer__icon--percent' />
              Lihat Semua Promo
              <i className='section-spacer__icon section-spacer__icon--chevron' />
            </SectionSpacer>

            <CategoryList />
          </Tab>

          <Tab label='Promo'>
            <h2 style={{ textAlign: 'center' }}>PROMO!</h2>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default HomeView
