import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './RecommendationProduct.scss'
import TextHeader from '../../components/TextHeader'
import RecommendationProductPlaceholder from './assets/recommendation-product-placeholder.png'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

class RecommendationProduct extends Component {
  static propTypes = {
    data: React.PropTypes.shape({
      curr_page: React.PropTypes.number,
      per_page: React.PropTypes.number,
      max_page: React.PropTypes.number,
      items: React.PropTypes.arrayOf(React.PropTypes.object)
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

  componentDidMount () {
    // for GTM to consume
    try {
      const event = new Event('HomeCategoryLoaded')
      document.dispatchEvent(event)
    } catch (e) {
      console.log('Old browser not supporting Custom Event. Falling back.')

      const oldEvent = document.createEvent('Event')
      oldEvent.initEvent('HomeCategoryLoaded', true, true)

      document.dispatchEvent(oldEvent)
    }
  }

  _gtmNotifyAllHotlistsClicked () {
    GTM.pushEvent('clickHomepage', 'Homepage', 'Click', 'View All Hotlist')
  }

  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickHotlist', 'Hotlist', 'Click', item.title)
    }
  }

  _renderHotlistItem (item, index) {
    return (
      <div className='u-col u-col-6 recommendation-product__box'
        onClick={this._gtmNotifyItemClicked(item)} key={`recommended-${index}`}>
        <div className='recommendation-product__box-content'>
          <a aria-hidden='true' tabIndex='-1' href={item.url} className='u-block'>
            <img src={item.image_url} alt={`Gambar ${item.title}`} className='recommendation-product__img' />
            <div className='recommendation-product__content-desc'>
              <div className='recommendation-product__content-title u-truncate'>{ item.title }</div>
              <div className='recommendation-product__content-startto'>
                { lang[this.props.propLang]['Mulai dari'] }&nbsp;
                <span className='recommendation-product__content-price'>{ item.price_start_from }</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    )
  }

  _verifyHotlistData (defaultValue) {
    let result = defaultValue
    if (this.props.data.items && this.props.data.curr_page === 1) {
      result = this.props.data.items
    }

    return result
  }

  render () {
    const placeholder = [
      { image_url: RecommendationProductPlaceholder, title_enc: 'Hotlist', price_start_from: 'Rp 0' }
    ]

    const hotlists = this._verifyHotlistData(placeholder)

    return (
      <div className='u-clearfix'>
        <TextHeader textType={2} injectClassName='recommendation-product__title'>
          Hot List
        </TextHeader>
        <div className='recommendation-product-container u-clearfix'>
          <div className='recommendation-product__contents u-clearfix'>
            <div className='u-clearfix'>
              {hotlists.map(this._renderHotlistItem) }
            </div>
            <div className='recommendation-product__see-all u-clearfix'>
              <Link className='recommendation-product__see-all-link'
                to='/hot'
                onClick={this._gtmNotifyAllHotlistsClicked}>
                { lang[this.props.propLang]['Lihat Semua'] }
                <i className='promo-spacer__icon promo-spacer__icon--arrow' />
              </Link>
            </div>
          </div>
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
export default connect(mapStateToProps, undefined)(RecommendationProduct)
