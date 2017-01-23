import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import './WishListView.scss'

import lang from '../../../lib/utils/Lang'
import { updateQuery } from '../module'

class WishListSearchEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string,
    updateQuery: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.seeAllWishlist = this.seeAllWishlist.bind(this)
  }

  seeAllWishlist () {
    this.props.updateQuery('')
  }

  render () {
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
          <div className='wishlist__btn-holder' onClick={this.seeAllWishlist}>
            <div className='wishlist__btn-see-all'>
              { lang[this.props.lang]['See All Wishlists'] }
            </div>
          </div>
        </div>
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
