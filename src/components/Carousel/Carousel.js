import React, { Component } from 'react'
import './Carousel.scss'
import './slick.scss'
import './slick-theme.scss'

var Slider = require('react-slick')
var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  swipeToSlide: true,
  centerMode: true,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 430,
      settings: {
        centerPadding: '10px'
      }
    },
    {
      breakpoint: 480,
      settings: {
        centerPadding: '30px'
      }
    },
    {
      breakpoint: 530,
      settings: {
        centerPadding: '60px'
      }
    },
    {
      breakpoint: 728,
      settings: {
        centerPadding: '100px'
      }
    }
  ]
}

const IMG_PATH = 'https://ecs7.tokopedia.net/img/banner/2016/11/8/11708207/'
const SLIDER_IMG = IMG_PATH + '11708207_73008c2e-8f73-4610-b345-b8aeea28ff5e.jpg'
const SLIDER_WEBP = SLIDER_IMG + '.webp'

class Carousel extends Component {
  componentDidMount () {
    var self = this
    setTimeout(function () {
      self.forceUpdate()
    }, 100)
  }

  render () {
    return (
      <div className='carousel u-clearfix'>
        <Slider {...settings}>
          <div className='carousel__item'>
            <a href='#' className='u-text-decoration-none'>
              <div className='carousel__item-container u-mx-auto u-block'>
                <picture className='carousel__img u-fit u-mx-auto' alt='Lorem ipsum'>
                  <source srcSet={SLIDER_WEBP} />
                  <img className='carousel__img u-fit u-mx-auto' src={SLIDER_IMG} alt='Lorem ipsum'/>
                </picture>
              </div>
            </a>
          </div>
        </Slider>
      </div>
    )
  }
}

export default Carousel
