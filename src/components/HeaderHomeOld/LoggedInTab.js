import React, { Component } from 'react'
import TabSlider from 'react-slick'

import {HOSTNAME} from '../../constants'

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  draggable: true,
  centerMode: false,
  variableWidth: true,
  slidesToShow: 4,
  slidesToScroll: 1
}

class LoggedInTab extends Component {
  render () {
    return (
      <TabSlider {...settings} className='tab logged-in'>
        <div className='tab-item active'>
          <label className='tab-link'>
            <a href='#'>Home</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/?view=feed_preview`}>Feed</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/fav-shop.pl?view=1`}>Favorit</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/hot?page=1`}>Hot List</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/?view=wishlist_preview`}>Wishlist</a>
          </label>
        </div>
      </TabSlider>
    )
  }
}

export default LoggedInTab
