import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../../WishList/assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import './FavoriteView.scss'

import lang from '../../../lib/utils/Lang'
import { updateQuery } from '../module'

class FavoriteSearchEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string,
    updateQuery: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.seeAllFavorite = this.seeAllFavorite.bind(this)
  }

  seeAllFavorite () {
    this.props.updateQuery('')
  }

  render () {
    return (
      <div className='favorite-container u-clearfix'>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto favorite__empty-img'
          alt='Tidak ada favorite' />
        <div className='favorite__not-found-holder'>
          <div className='favorite__product-not-found'>
            { lang[this.props.lang]['Favorite Search Empty'] }
          </div>
          <div className='favorite__btn-holder' onClick={this.seeAllFavorite}>
            <div className='favorite__btn-see-all'>
              { lang[this.props.lang]['See All Favorites'] }
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
export default (connect(mapStateToProps, mapDispatchToProps)(FavoriteSearchEmpty))
