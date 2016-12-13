import React from 'react'
import './HotList.scss'
import TextHeader from '../../components/TextHeader'

var Slider = require('react-slick')
var settings = {
  autoplay: true,
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  draggable: true,
  swipeToSlide: true,
  centerMode: false,
  variableWidth: true,
  slidesToShow: 3,
  slidesToScroll: 1
}

export const HotList = () => (
  <div className='hotlist u-clearfix'>
    <TextHeader textType={2} injectClassName='hotlist__title'>
      Hot List
    </TextHeader>
    <Slider {...settings}>
      <div className='hotlist__item'>
        <div className='hotlist__wrapper'>
          <img src='http://placehold.it/277x144' className='u-fit u-block u-mx-auto' alt='' />
          <div className='hotlist__footer u-clearfix u-mt1'>
            <div className='u-clearfix'>
              <div className='u-col u-col-5 u-truncate u-relative'>
                <a aria-hidden='true' tabindex='-1' href='#' className='hotlist__click u-block'></a>
                <span className='hotlist__name u-bold'>Splat Toy</span>
              </div>
              <div className='u-col u-col-7 u-right-align u-relative'>
                <a aria-hidden='true' tabindex='-1' href='#' className='hotlist__click u-block'></a>
                <small className='hotlist__start-from u-mr1'>Mulai dari:</small>
                <span className='hotlist__price u-bold'>Rp 15rb</span>&nbsp;&rsaquo;
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='hotlist__item'>
        <div className='hotlist__wrapper'>
          <img src='http://placehold.it/277x144' className='u-fit u-block u-mx-auto' alt='' />
          <div className='hotlist__footer u-clearfix u-mt1'>
            <div className='u-clearfix'>
              <div className='u-col u-col-5 u-truncate u-relative'>
                <a aria-hidden='true' tabindex='-1' href='#' className='hotlist__click u-block'></a>
                <span className='hotlist__name u-bold'>Splat Toy</span>
              </div>
              <div className='u-col u-col-7 u-right-align u-relative'>
                <a aria-hidden='true' tabindex='-1' href='#' className='hotlist__click u-block'></a>
                <small className='hotlist__start-from u-mr1'>Mulai dari:</small>
                <span className='hotlist__price u-bold'>Rp 15rb</span>&nbsp;&rsaquo;
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='hotlist__item'>
        <div className='hotlist__wrapper'>
          <img src='http://placehold.it/277x144' className='u-fit u-block u-mx-auto' alt='' />
          <div className='hotlist__footer u-clearfix u-mt1'>
            <div className='u-clearfix'>
              <div className='u-col u-col-5 u-truncate u-relative'>
                <a aria-hidden='true' tabindex='-1' href='#' className='hotlist__click u-block'></a>
                <span className='hotlist__name u-bold'>Splat Toy</span>
              </div>
              <div className='u-col u-col-7 u-right-align u-relative'>
                <a aria-hidden='true' tabindex='-1' href='#' className='hotlist__click u-block'></a>
                <small className='hotlist__start-from u-mr1'>Mulai dari:</small>
                <span className='hotlist__price u-bold'>Rp 15rb</span>&nbsp;&rsaquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  </div>
)

export default HotList
