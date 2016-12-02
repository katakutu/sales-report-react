import React, { Component } from 'react'
import TabSlider from 'react-slick'

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
            <a href='https://m.tokopedia.com/?view=feed_preview'>Feed</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='https://m.tokopedia.com/fav-shop.pl?view=1'>Favorit</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='https://m.tokopedia.com/hot?page=1'>Hot List</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='https://m.tokopedia.com/?view=wishlist_preview'>Wishlist</a>
          </label>
        </div>
      </TabSlider>
    )
  }
}

export default LoggedInTab
