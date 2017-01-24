import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../../WishList/assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import lang from '../../../lib/utils/Lang'
import { HOSTNAME } from '../../../constants'

import './FavoriteView.scss'

class FavoriteEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string
  }

  render () {
    return (
      <div className='favorite-container u-clearfix'>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto wishlist__empty-img'
          alt='Tidak ada favorite' />
        <div className='favorite__empty'>
          { lang[this.props.lang]['Empty favorite'] }
        </div>
        <a href={`${HOSTNAME}/toppicks`} className='favorite__btn-holder'>
          <div className='favorite__lets-search'>
            { lang[this.props.lang]['Search for Products'] }
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
export default (connect(mapStateToProps, undefined)(FavoriteEmpty))
