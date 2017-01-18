import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import lang from '../../../lib/utils/Lang'

import './WishListView.scss'

class WishlistEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string
  }
  render () {
    return (
      <div className='wishlist-container u-clearfix'>
        <h3 style={{ textAlign: 'center' }}>
          {lang[this.props.lang]['emptyWishlist']}
        </h3>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-fit u-block u-mx-auto'
          alt='Tidak ada wishlist' />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default (connect(mapStateToProps, undefined)(WishlistEmpty))
