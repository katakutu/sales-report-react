/* global window */

import React, { Component } from 'react'
import './Carousel.scss'
import './slick.scss'
import './slick-theme.scss'
import Slider from 'react-slick'

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnFocus: true,
  pauseOnHover: true,
  dots: true,
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

class Carousel extends Component {
  static propTypes = {
    images: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  constructor (props) {
    super(props)

    this._createCarouselItems = this._createCarouselItems.bind(this)
    this._gtmNotifySlideClick = this._gtmNotifySlideClick.bind(this)
    this._gtmNotifySlideChange = this._gtmNotifySlideChange.bind(this)
  }

  _createCarouselItems (image, index) {
    return (
      <div className='carousel__item' key={`car-${index}`}>
        <a href={image.redirect_url}
          className='u-text-decoration-none'
          onClick={this._gtmNotifySlideClick(index)}
          target='_blank'>
          <div className='carousel__item-container u-mx-auto u-block'>
            <picture className='carousel__img u-fit u-mx-auto' alt={image.title}>
              <source srcSet={image.image_url} />
              <img className='carousel__img u-fit u-mx-auto'
                src={image.image_url}
                alt={image.title} />
            </picture>
          </div>
        </a>
      </div>
    )
  }

  _gtmNotifySlideClick (index) {
    return (event) => {
      window.dataLayer = window.dataLayer || []

      if (this.props.images.length > 0) {
        window.dataLayer.push({
          'event': 'sliderBanner',
          'eventCategory': 'Slider',
          'eventAction': 'Click',
          'eventLabel': this.props.images[index]
        })
      }
    }
  }

  _gtmNotifySlideChange (index) {
    window.dataLayer = window.dataLayer || []

    if (this.props.images.length > 0) {
      window.dataLayer.push({
        'event': 'sliderBanner',
        'eventCategory': 'Slider',
        'eventAction': 'Impression',
        'eventLabel': this.props.images[index]
      })

      let link = this.props.images[index]['redirect_url']
      let baseURL = link.split('?')[0]
      let parts = baseURL.split('/')
      let title = parts[parts.length - 1] || parts[parts.length - 2]

      if (title.length) {
        window.dataLayer.push({
          'banner_impression_id': title,
          'ecommerce': {
            'promoView': {
              'promotions': [
                {
                  'id': title,
                  'name': title,
                  'position': 'slider_banner'
                }]
            }
          }
        })
      }
    }
  }

  render () {
    let placeholder = {
      'image_url': 'https://placehold.it/414x185?text=+',
      'redirect_url': '#',
      'title': 'Placeholder Image'
    }
    let sliders = (this.props.images.length === 0)
      ? this._createCarouselItems(placeholder, 0)
      : this.props.images.map(this._createCarouselItems)

    return (
      <div className='carousel u-clearfix'>
        <Slider {...settings} afterChange={this._gtmNotifySlideChange}>
          { sliders }
        </Slider>
      </div>
    )
  }
}

export default Carousel
