import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import lang from '../../../lib/utils/Lang'
import { HOSTNAME } from '../../../constants'

import './WishListView.scss'

class WishlistEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string
  }
  render () {
    return (
      <div className='wishlist-container u-clearfix'>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto wishlist__empty-img'
          alt='Tidak ada wishlist' />
        <div className='wishlist__empty'>
          {lang[this.props.lang]['Empty wishlist']}
        </div>
        <a href={`${HOSTNAME}/toppicks`} className='wishlist__btn-holder'>
          <div className='wishlist__lets-search'>
            Mulai cari produk
          </div>
        </a>
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
