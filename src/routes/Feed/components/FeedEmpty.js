import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import lang from '../../../lib/utils/Lang'
import TopAds from '../../../components/TopAds/TopAds'
import emptyImage from '../assets/feed-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import TextHeader from '../../../components/TextHeader'
import { HOSTNAME } from '../../../constants'

import './FeedView.scss'

const TOPADS_PARAMS = {
  ep: '',
  src:'fav_product',
  item: 2,
  page: 1,
  q: ''
}

class FeedEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string,
    title: React.PropTypes.string,
    userID: React.PropTypes.number
  }

  render () {
    return (
      <div className='u-clearfix'>
        <TextHeader textType={2}>
          { this.props.title }
        </TextHeader>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto feed__empty-img'
          alt={lang[this.props.lang]['Feed Empty']} />
        <div className='feed__empty'>
          { lang[this.props.lang]['Feed Empty'] }
        </div>
        <div className='feed__btn-holder'>
          <a href={`${HOSTNAME}/fav-shop.pl?view=1`}>
            <div className='feed__lets-search'>
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
export default (connect(mapStateToProps, undefined)(FeedEmpty))
