import React, { Component } from 'react'
import './Carousel.scss'
import './slick.scss'
import './slick-theme.scss'

var Slider = require('react-slick');
var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  draggable: true,
  swipeToSlide: true,
  centerMode: true,
  centerPadding: '10px',
  variableWidth: false
};

class Carousel extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self = this;
    setTimeout(function() {
      self.forceUpdate();
    }, 100);
  }

  render() {
    return (
      <div className="carousel u-clearfix">
        <Slider {...settings}>
          <div className="carousel__item">
            <div className="carousel__item-container u-mx-auto u-block">
              <picture className="carousel__img u-fit u-mx-auto">
                <source srcSet="https://ecs7.tokopedia.net/img/banner/2016/11/8/11708207/11708207_73008c2e-8f73-4610-b345-b8aeea28ff5e.jpg.webp"/>
                <img className="carousel__img u-fit u-mx-auto" src="https://ecs7.tokopedia.net/img/banner/2016/11/8/11708207/11708207_73008c2e-8f73-4610-b345-b8aeea28ff5e.jpg"/>
              </picture>
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}

export default Carousel
