import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './HotList.scss'
import TextHeader from '../../components/TextHeader'
import Slider from 'react-slick'

const settings = {
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

class HotList extends Component {
  static propTypes = {
    data: React.PropTypes.shape({
      message_status: React.PropTypes.number,
      success: React.PropTypes.number,
      data: React.PropTypes.arrayOf(React.PropTypes.object)
    })
  }

  constructor (props) {
    super(props)

    this._renderHotlistItem = this._renderHotlistItem.bind(this)
    this._verifyHotlistData = this._verifyHotlistData.bind(this)
  }

  _renderHotlistItem (item, index) {
    return (
      <div className='hotlist__item' key={`hotlist-${index}`}>
        <div className='hotlist__wrapper'>
          <img src={ item.image_url } className='u-fit u-block u-mx-auto' alt={`Gambar ${item.title_enc}`} />
          <div className='hotlist__footer u-clearfix u-mt1'>
            <div className='u-clearfix'>
              <div className='u-col u-col-5 u-truncate u-relative'>
                <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                <span className='hotlist__name u-bold'>{ item.title_enc }</span>
              </div>
              <div className='u-col u-col-7 u-right-align u-relative'>
                <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                <small className='hotlist__start-from u-mr1'>Mulai dari:</small>
                <span className='hotlist__price u-bold'>{ item.price_start_from }</span>&nbsp;&rsaquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _verifyHotlistData (defaultValue) {
    let result = defaultValue
    if (this.props.data.hotlists && this.props.data.hotlists.success === 1) {
      result = this.props.data.hotlists.data
    }

    return result
  }

  render() {
    const placeholder = [
      { image_url: 'http://placehold.it/277x144', title_enc: 'Hotlist', price_start_from: 'Rp 0' }
    ]
  
    const hotlists = this._verifyHotlistData(placeholder)

    return (
      <div className='hotlist u-clearfix'>
        <TextHeader textType={2} injectClassName='hotlist__title'>
          Hot List
        </TextHeader>
        <Slider {...settings}>
          { hotlists.map(this._renderHotlistItem) }
        </Slider>
      </div>
    )
  }
}

const HotListQuery = gql`
  query Query {
    hotlists{
      message_status
      success
      data{
        title_enc
        image_url
        price_start_from
      }
    }
  }
`

export default graphql(HotListQuery)(HotList)
