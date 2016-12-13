import React, { Component } from 'react'
import { connect } from 'react-redux'
import TabSlider from 'react-slick'

import { appIsLoading } from '../../store/app'
import { HOSTNAME } from '../../constants'

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  draggable: true,
  centerMode: false,
  variableWidth: false,
  slidesToShow: 4,
  slidesToScroll: 4
}

class LoggedInTab extends Component {
  static propTypes = {
    appIsLoading: React.PropTypes.func
  }

  render () {
    let loadingFunc = event => this.props.appIsLoading(true)

    return (
      <TabSlider {...settings} className='tab logged-in'>
        <div className='tab-item active'>
          <label className='tab-link'>
            <a href='#'>Home</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/?view=feed_preview`} onClick={loadingFunc}>Feed</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/fav-shop.pl?view=1`} onClick={loadingFunc}>Favorit</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/hot?page=1`} onClick={loadingFunc}>Hot List</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/?view=wishlist_preview`} onClick={loadingFunc}>Wishlist</a>
          </label>
        </div>
      </TabSlider>
    )
  }
}

const mapDispatchToProps = { appIsLoading }
export default connect(undefined, mapDispatchToProps)(LoggedInTab)
