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
            <a href='#'>Feed</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='#'>Favorit</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='#'>Hot List</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='#'>Wishlist</a>
          </label>
        </div>
      </TabSlider>
    )
  }
}

export default LoggedInTab
