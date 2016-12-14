import React, { Component } from 'react'
import './Carousel.scss'
import './slick.scss'
import './slick-theme.scss'
import TopedMojitoAPI from '../../lib/api/Search/TopedMojitoAPI'

var Slider = require('react-slick')
var settings = {
  autoplay: true,
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

const api = new TopedMojitoAPI()

class Carousel extends Component {
  state = {
    images: []
  }

  componentDidMount () {
    api.getSlides(25, 2, 65535, 1, 0).then(result => {
      this.setState({ images: result['data']['slides'] })
    }).catch(error => {
      error // TODO: Logs this to server?
      this.setState({ images: [] })
    })
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

      dataLayer.push({
        'event': 'sliderBanner',
        'eventCategory': 'Slider',
        'eventAction': "Click",
        'eventLabel': this.state.images[index]
      })
    }
  }

  _gtmNotifySlideChange (index) {
    window.dataLayer = window.dataLayer || []

    dataLayer.push({
      'event': 'sliderBanner',
      'eventCategory': 'Slider',
      'eventAction': "Impression",
      'eventLabel': this.state.images[index]
    })

    let link = this.state.images[index]['redirect_url']
    let baseURL = link.split("?")[0]
    let parts = baseURL.split("/")
    let title = parts[parts.length - 1] || parts[parts.length - 2]

    if (title.length) {
      dataLayer.push({
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
      });
    }
  }

  render () {
    let placeholder = {
      'image_url': 'https://placehold.it/414x185',
      'redirect_url': '#',
      'title': 'Placeholder Image'
    }
    let sliders = (this.state.images.length === 0)
      ? this._createCarouselItems(placeholder, 0)
      : this.state.images.map(this._createCarouselItems)

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
