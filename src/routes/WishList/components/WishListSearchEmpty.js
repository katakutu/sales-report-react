import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/search-wishlist-empty.png'
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

  seeAllWishlist () {
    this.props.updateQuery('')
  }

  render () {
    const TOPADS_PARAMS = {
      ep: 'product',
      src:'wishlist',
      item: 2,
      page: 1,
      q: ''
    }

    return (
      <div className='wishlist-container u-clearfix'>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto wishlist__search__empty-img'
          alt='Tidak ada wishlist' />
        <div className='wishlist__empty'>
          { lang[this.props.lang]['Wishlist Search Empty'] }
        </div>
        <div className='wishlist__btn-holder'>
          <div className='wishlist__btn-see-all' onClick={this.seeAllWishlist}>
            { lang[this.props.lang]['See All Wishlists'] }
          </div>
        </div>
        <TopAds
          userID={this.props.userID}
          ep={TOPADS_PARAMS.ep}
          src={TOPADS_PARAMS.src}
          item={TOPADS_PARAMS.item}
          page={TOPADS_PARAMS.page}
          q={TOPADS_PARAMS.q} />
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
