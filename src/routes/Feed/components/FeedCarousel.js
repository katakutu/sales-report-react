import React, { Component, PropTypes } from 'react'
import '../../../components/Carousel/slick.scss'
import '../../../components/Carousel/slick-theme.scss'
import Slider from 'react-slick'
import CarouselPlaceholder from '../../../components/Carousel/assets/carousel-placeholder.jpg'
import './FeedView.scss'

const settings = {
  autoplay: false,
  pauseOnFocus: true,
  pauseOnHover: true,
  dots: false,
  arrows: false,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  variableWidth: true
}

class FeedCarousel extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(React.PropTypes.object)
  }

  constructor (props) {
    super(props)

    this._createCarouselItems = this._createCarouselItems.bind(this)
  }

  _createCarouselItems (item, index) {
		 const labels = item.labels || []
		 const badges = item.badges || []

    return (
      <div className='product-list-wrapper' key={`rec-${index}`}>
        <figure>
          <a href={item.product_url ? item.product_url : item.url} className='relative'>
            <img className=''
              src={item.product_image ? item.product_image : item.image_url}
              alt={item.product_name ? item.product_name : item.name}
              data-original={item.product_image ? item.product_image : item.image_url} />
          </a>
        </figure>
        <div className='product-list-desc'>
          <a aria-hidden='true' tabIndex='-1' href={item.product_url ? item.product_url : item.url} className=''>
            <span className='product-list-name pl-5 u-truncate'> { item.name ? item.name : item.product_name} </span>
          </a>
          <div className='product-list-price u-truncate'> { item.product_price ? item.product_price : item.price } </div>
          <div className='product-list-bedges plr-5 u-truncate'>
            {
								labels.map((label, li) => {
  return (
    <span
      className='feed__label'
      key={`feed-${index}-label-${li}`}
      className={`product-tag-${label['title']}`}>
      { label['title'] }
    </span>
  )
})
							}
            {
								labels.length === 0 &&
								<span className='feed__label' style={{ backgroundColor: '#ffffff' }}>&nbsp;</span>
							}
          </div>
          <div className='clearfix' />
          <div className='product-list-shop'>
            <div>
              <span className='u-truncate'>
                <a href='#' className='feed__shop-name u-truncate'>{ item.shop_name ? item.shop_name : item.shop.name }</a>
              </span>
            </div>
            <div className='row-fluid'>
              <span className='product-shop-location font-grey pull-left u-truncate'>
                <i className='mi-icon mi-location' />
                { item.shop_location ? item.shop_location : item.shop.location }
              </span>
              <span className='product-shop-bedges pr-0 pull-right'>
                {
                  badges.map((badge, bi) => {
                    return (
                      <img
                        alt={badge['title']}
                        className='feed__img-badge'
                        key={`feed-${index}-badge-${bi}`}
                        src={badge['image_url']} />
                    )
                  })
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    let placeholder = {
      'image_url': CarouselPlaceholder,
      'redirect_url': '#',
      'title': 'Placeholder Image'
    }
    let swipers = (this.props.images !== [])
      ? this.props.images.map(this._createCarouselItems)
      : this._createCarouselItems(placeholder, 0)

    return (
      <div className='product-list-container'>
        <Slider {...settings}>
          { swipers }
        </Slider>
      </div>
    )
  }
}

export default FeedCarousel
