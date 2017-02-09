import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import lang from '../../../lib/utils/Lang'
import TopAds from '../../../components/TopAds/TopAds'
import { HOSTNAME } from '../../../constants'

import './WishListView.scss'

const TOPADS_PARAMS = {
  ep: 'product',
  src:'wishlist',
  item: 2,
  page: 1,
  q: ''
}

class WishlistEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string,
    userID: React.PropTypes.number
  }

  render () {
    return (
      <div className='u-clearfix'>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto wishlist__empty-img'
          alt={lang[this.props.lang]['Empty wishlist']} />
        <div className='wishlist__empty'>
          { lang[this.props.lang]['Empty wishlist'] }
        </div>
        <div className='wishlist__btn-holder'>
          <a href={`${HOSTNAME}/toppicks`}>
            <div className='wishlist__lets-search'>
              { lang[this.props.lang]['Search for Products'] }
            </div>
          </a>
        </div>
        <TopAds
          userID={this.props.userID}
          ep={TOPADS_PARAMS.ep}
          src={TOPADS_PARAMS.src}
          item={TOPADS_PARAMS.item}
          page={TOPADS_PARAMS.page}
          q={TOPADS_PARAMS.q}
          />
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
