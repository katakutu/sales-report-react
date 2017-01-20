import React, { Component } from 'react'
import './TopAds.scss'
import TopAdsProduct from './TopAdsProduct'
import example from './example.json'
import Modal from '../Modal/Modal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class TopAds extends Component {
  static propTypes = {
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

    example.items.forEach(function (item, index) {
      example.display === 'product' && topads.push(<TopAdsProduct data={item} key={index} />)
    })

    if (this.props.stateModal) {
      console.log(this.props.stateModal)
      modal = <Modal
        eventModal={this.props.eventModal}
        contentModal={this.props.contentModal} />
    }
    return (
      <div>
        <div className='u-clearfix'>
          <div className='u-col u-col-12 topads__title__contents'>
            <p>Promoted</p>
            <a onClick={() => this.props.eventModal(true)}>
              <img src='https://ecs1.tokopedia.net/img/icon-information.png' alt='topads information' />
            </a>
          </div>
          { topads }
        </div>
        <ReactCSSTransitionGroup {...transitionOverlaySplashOptions}>
          { modal }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default TopAds
