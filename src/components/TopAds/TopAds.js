import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import queries from '../../queries'
import './TopAds.scss'
import TopAdsProduct from './TopAdsProduct'
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
      })
    }

    if (this.props.stateModal) {
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
