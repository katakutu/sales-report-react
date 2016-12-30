import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './HotList.scss'
import TextHeader from '../../components/TextHeader'
import Slider from 'react-slick'
import HotListPlaceholder from './assets/hotlist-placeholder.jpg'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

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
  slidesToScroll: 1,
  afterChange: function (currentSlide) {
    if (currentSlide === 2) {
      const slideTrackEl = document.querySelector('#home-category .slick-track')
      const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const slideEl = document.querySelector('#home-category .slick-slide')
      const slideWidth = slideEl.offsetWidth
      const slideViewportOffset = viewportWidth - slideWidth
      const paddingLeft = 10

      const maxTranslateX = (slideWidth * 2 - slideViewportOffset) + paddingLeft
      slideTrackEl.style.transform = `translate3d(-${maxTranslateX}px, 0, 0)`
    }
  }
}

class HotList extends Component {
  static propTypes = {
    data: React.PropTypes.shape({
      message_status: React.PropTypes.number,
      success: React.PropTypes.number,
      data: React.PropTypes.arrayOf(React.PropTypes.object)
    }),
    propLang: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this._gtmNotifyAllHotlistsClicked = this._gtmNotifyAllHotlistsClicked.bind(this)
    this._gtmNotifyItemClicked = this._gtmNotifyItemClicked.bind(this)
    this._renderHotlistItem = this._renderHotlistItem.bind(this)
    this._verifyHotlistData = this._verifyHotlistData.bind(this)
  }

  _gtmNotifyAllHotlistsClicked () {
    GTM.pushEvent('clickHomepage', 'Homepage', 'Click', 'View All Hotlist')
  }

  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickHotlist', 'Hotlist', 'Click', item.title_enc)
    }
  }

  _renderHotlistItem (item, index) {
    return (
      <div className='hotlist__item' onClick={this._gtmNotifyItemClicked(item)} key={`hotlist-${index}`}>
        <div className='hotlist__wrapper'>
          <a aria-hidden='true' tabIndex='-1' href={item.url} className='hotlist__click u-block' />
          <img src={item.image_url} className='u-fit u-block u-mx-auto' alt={`Gambar ${item.title_enc}`} />
          <div className='hotlist__footer u-clearfix u-mt1'>
            <div className='u-clearfix'>
              <div className='u-col u-col-5 u-truncate u-relative'>
                <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                <span className='hotlist__name u-bold'>{ item.title_enc }</span>
              </div>
              <div className='u-col u-col-7 u-right-align u-relative'>
                <a aria-hidden='true' tabIndex='-1' href={item.url} className='hotlist__click u-block' />
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
    if (this.props.data.data && this.props.data.success === 1) {
      result = this.props.data.data
    }

    return result
  }

  render () {
    const placeholder = [
      { image_url: HotListPlaceholder, title_enc: 'Hotlist', price_start_from: 'Rp 0' }
    ]

    const hotlists = this._verifyHotlistData(placeholder)

    return (
      /* #home-category is for editor's pick GTM */
      <div id='home-category' className='hotlist u-clearfix'>
        <TextHeader textType={2}>
          Hot List
        </TextHeader>
        <Slider {...settings}>
          { hotlists.map(this._renderHotlistItem) }
        </Slider>

        <div className='u-clearfix' id='hotlist-spacer'>
          <Link to={'/hot'} className='hotlist-spacer__link' onClick={this._gtmNotifyAllHotlistsClicked}>
            { lang[this.props.propLang]['Lihat Semua Hotlist'] }
            <i className='hotlist-spacer__icon hotlist-spacer__icon--arrow' />
            <div className='u-clearfix' />
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    propLang: state['app'] ? state['app'].lang : state.lang
  }
}
export default connect(mapStateToProps, undefined)(HotList)
