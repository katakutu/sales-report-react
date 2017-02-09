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
import lang from '../../lib/utils/Lang'

class TopAds extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    userID: React.PropTypes.number,
    ep: React.PropTypes.string,
    src: React.PropTypes.string,
    item: React.PropTypes.number,
    page: React.PropTypes.number,
    q: React.PropTypes.string,
    lang: React.PropTypes.string
  }

  state = {
    modalState: false
  }

  constructor (props) {
    super(props)

    this._eventModal = this._eventModal.bind(this)
  }

  _eventModal (state) {
    this.setState({
      modalState: state
    })
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

    const MODAL_PARAMS = {
      modalContent: {
        data: [
          {
            icon: 'https://ecs1.tokopedia.net/img/ads_microsite/stat.png',
            title: lang[this.props.lang]['Topads Modal Section 1 Title'],
            content: lang[this.props.lang]['Topads Modal Section 1 Content']
          },
          {
            icon: 'https://ecs1.tokopedia.net/img/ads_microsite/jangkau.png',
            title: lang[this.props.lang]['Topads Modal Section 2 Title'],
            content: lang[this.props.lang]['Topads Modal Section 2 Content']
          },
          {
            icon: 'https://ecs1.tokopedia.net/img/ads_microsite/efektif.png',
            title: lang[this.props.lang]['Topads Modal Section 3 Title'],
            content: lang[this.props.lang]['Topads Modal Section 3 Content']
          }
        ],
        link: 'https://m.tokopedia.com/iklan?campaign=topads&source=feed&medium=mobile',
        linkText: lang[this.props.lang]['Topads Modal Button']
      }
    }

    if (this.props.data.topads && this.props.data.topads.items) {
      const topadsdata = this.props.data.topads
      topadsdata.items.map((item, index) => {
        topadsdata.display === 'product' && topads.push(<TopAdsProduct key={`top-ads-item-${index}`}
          data={item} />)
        topadsdata.display === 'shop' && topads.push(<TopAdsShop key={`top-ads-shop-item-${index}`}
          data={item} />)
      })
    }

    if (this.state.modalState) {
      modal = <Modal
        eventModal={this._eventModal}
        contentModal={MODAL_PARAMS.modalContent} />
    }
    return (
      <div>
        <div className='topads__wrapper'>
          <div className='u-clearfix topads__sub__wrapper'>
            <div className='u-col u-col-12 topads__title__contents'>
              <a onClick={() => this._eventModal(true)}>
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
