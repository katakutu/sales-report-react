import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import queries from '../../queries'
import './TopAds.scss'
import iconInfo from './assets/icon-info.png'
import TopAdsProduct from './TopAdsProduct'
import TopAdsShop from './TopAdsShop'
import Modal from '../Modal/Modal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class TopAds extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    stateModal: React.PropTypes.bool,
    eventModal: React.PropTypes.func,
    contentModal: React.PropTypes.object,
    userID: React.PropTypes.number,
    ep: React.PropTypes.string,
    src: React.PropTypes.string,
    item: React.PropTypes.number,
    page: React.PropTypes.number,
    q: React.PropTypes.string
  }

  render () {
    let topads = []
    let modal
    //
    const transitionOverlaySplashOptions = {
      transitionName: 'splashEffect',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    if (this.props.data.topads && this.props.data.topads.items) {
      const topadsdata = this.props.data.topads
      topadsdata.items.map((item, index) => {
        topadsdata.display === 'product' && topads.push(<TopAdsProduct key={`top-ads-item-${index}`} data={item} />)
        topadsdata.display === 'shop' && topads.push(<TopAdsShop key={`top-ads-shop-item-${index}`} data={item} />)
      })
    }

    if (this.props.stateModal) {
      modal = <Modal
        eventModal={this.props.eventModal}
        contentModal={this.props.contentModal} />
    }
    return (
      <div>
        <div className='topads__wrapper'>
          <div className='u-clearfix topads__sub__wrapper'>
            <div className='u-col u-col-12 topads__title__contents'>
              <a onClick={() => this.props.eventModal(true)}>
                Promoted
                <img src={iconInfo} alt='topads information' />
              </a>
            </div>
            { topads }
          </div>
        </div>
        <ReactCSSTransitionGroup {...transitionOverlaySplashOptions}>
          { modal }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    topads: state['app'] ? state['app'].topads : state.topads
  }
}
export default graphql(queries.TopAdsQueries.getAll, {
  options: ({ userID, ep, src, item, page, q }) => ({
    variables: { userID, ep, src, item, page, q },
    forceFetch: true,
    returnPartialData: true
  })
}
)(connect(mapStateToProps, undefined)(TopAds))
