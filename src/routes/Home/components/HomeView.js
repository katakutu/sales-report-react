import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
import PromoBanner from '../../../components/PromoBanner'
import Ticker from '../../../components/Ticker'
import HotList from '../../../components/HotList'
import MoreInfo from '../../../components/MoreInfo'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

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
        <div id='widget-dmw' className='u-clearfix u-my2' /> { /* Pulsa widget container */ }
        <PromoBanner
          imageUrl='https://ecs7.tokopedia.net/assets-tokopedia-lite/prod/media/images/top-picks-natal.png'
          targetUrl='https://tokopedia.com'
          imageAlt='414 x 90' />
        <HotList />
        <CategoryList />
        <OfficialStoreSection />
        <MoreInfo />
      </div>
    )
  }
}

const query = gql`query Query { hello }`

const mapStateToProps = state => ({})

export default compose(
  graphql(query),
  connect(mapStateToProps)
)(HomeView)

