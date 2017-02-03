import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TopAds.scss'
import iconInfo from './assets/icon-info.png'
import TopAdsProduct from './TopAdsProduct'
import TopAdsShop from './TopAdsShop'
import Modal from '../Modal/Modal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class TopAdsIntegrate extends Component {
  static propTypes = {
    dataAds: React.PropTypes.object,
    stateModal: React.PropTypes.bool,
    eventModal: React.PropTypes.func,
    contentModal: React.PropTypes.object
  }

  render () {
    let topads = []
    let modal

    const transitionOverlaySplashOptions = {
      transitionName: 'splashEffect',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    if (this.props.dataAds && this.props.dataAds.items) {
      const topadsdata = this.props.dataAds
      topadsdata.items.map((item, index) => {
        topadsdata.display === 'product' && topads.push(<TopAdsProduct key={`top-ads-item-${index}`} data={item} />)
        topadsdata.display === 'shop' && topads.push(<TopAdsShop key={`top-ads-shop-item-${index}`} data={item} />)
      })
    }

    if (this.props.stateModal) {
      modal = <Modal
        stateModal={this.props.stateModal}
        contentModal={this.props.contentModal}
        eventModal={this.props.eventModal}
         />
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

export default (connect(undefined, undefined)(TopAdsIntegrate))
