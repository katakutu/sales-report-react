import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TopAds.scss'
import iconInfo from './assets/icon-info.png'
import TopAdsProduct from './TopAdsProduct'
import TopAdsShop from './TopAdsShop'
import TopAdsShopFavorite from './TopAdsShopFavorite'
import Modal from '../Modal/Modal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import lang from '../../lib/utils/Lang'

class TopAdsIntegrate extends Component {
  static propTypes = {
    dataAds: React.PropTypes.object,
    stateModal: React.PropTypes.bool,
    eventModal: React.PropTypes.func,
    contentModal: React.PropTypes.object,
    lang: React.PropTypes.string,
    source: React.PropTypes.string,
    token: React.PropTypes.string,
    userID: React.PropTypes.number,
    AddMutation: React.PropTypes.object,
    RemoveMutation: React.PropTypes.object,
    activeAction: React.PropTypes.func,
    deactiveAction: React.PropTypes.func
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

    console.log(this.props.token)

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

    const transitionOverlaySplashOptions = {
      transitionName: 'splashEffect',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    if (this.props.dataAds && this.props.dataAds.items) {
      const topadsdata = this.props.dataAds
      const that = this
      topadsdata.items.map((item, index) => {
        topadsdata.display === 'product' && topads.push(<TopAdsProduct key={`top-ads-item-${index}`} data={item} />)
        if (that.props.source === 'favorite') {
          topadsdata.display === 'shop' &&
          topads.push(<TopAdsShopFavorite
            key={`top-ads-shop-item-${index}`}
            data={item}
            token={this.props.token}
            userID={this.props.userID}
            AddMutation={this.props.AddMutation}
            RemoveMutation={this.props.RemoveMutation}
            activeAction={this.props.activeAction}
            deactiveAction={this.props.deactiveAction}
            />)
        } else {
          topadsdata.display === 'shop' && topads.push(<TopAdsShop key={`top-ads-shop-item-${index}`} data={item} />)
        }
      })
    }

    if (this.state.modalState) {
      modal = <Modal
        stateModal={this.state.modalState}
        contentModal={MODAL_PARAMS['modalContent']}
        eventModal={this._eventModal}
         />
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
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default (connect(mapStateToProps, undefined)(TopAdsIntegrate))
