import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import './WishListView.scss'

import TopAds from '../../../components/TopAds/TopAds'
import lang from '../../../lib/utils/Lang'
import { updateQuery } from '../module'

class WishListSearchEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string,
    updateQuery: React.PropTypes.func,
    userID: React.PropTypes.number
  }

  constructor (props) {
    super(props)

    this.seeAllWishlist = this.seeAllWishlist.bind(this)
    this._eventModal = this._eventModal.bind(this)
  }

  state = {
    modalState: false
  }

  _eventModal (state) {
    this.setState({
      modalState: state
    })
  }

  seeAllWishlist () {
    this.props.updateQuery('')
  }

  render () {
    const TOPADS_PARAMS = {
      ep: 'product',
      src:'wishlist',
      item: 2,
      page: 1,
      q: '',
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
        link: 'https://m.tokopedia.com/iklan?campaign=topads&amp;source=wishlist&amp;medium=mobile',
        linkText: lang[this.props.lang]['Topads Modal Button']
      }
    }

    return (
      <div className='wishlist-container u-clearfix'>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto wishlist__empty-img'
          alt='Tidak ada wishlist' />
        <div className='wishlist__not-found-holder'>
          <div className='wishlist__product-not-found'>
            { lang[this.props.lang]['Wishlist Search Empty'] }
          </div>
          <div className='wishlist__btn-holder'>
            <div className='wishlist__btn-see-all' onClick={this.seeAllWishlist}>
              { lang[this.props.lang]['See All Wishlists'] }
            </div>
          </div>
        </div>
        <TopAds
          userID={this.props.userID}
          ep={TOPADS_PARAMS.ep}
          src={TOPADS_PARAMS.src}
          item={TOPADS_PARAMS.item}
          page={TOPADS_PARAMS.page}
          q={TOPADS_PARAMS.q}
          stateModal={this.state.modalState}
          contentModal={TOPADS_PARAMS.modalContent}
          eventModal={this._eventModal} />
      </div>
    )
  }
}

const mapDispatchToProps = { updateQuery }
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default (connect(mapStateToProps, mapDispatchToProps)(WishListSearchEmpty))
