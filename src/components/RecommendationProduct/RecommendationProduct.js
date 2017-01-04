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

  componentDidMount () {
    // for GTM to consume
    const event = new Event('HomeCategoryLoaded')
    document.dispatchEvent(event)
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
      <div className='u-col u-col-6 recommendation-product__box'
        onClick={this._gtmNotifyItemClicked(item)} key={`recommended-${index}`}>
        <div className='recommendation-product__box-content'>
          <a aria-hidden='true' tabIndex='-1' href={item.url} className='hotlist__click u-block'>
            <img src={item.image_url} alt={`Gambar ${item.title_enc}`} className='recommendation-product__img' />
            <div className='recommendation-product__content-desc'>
              <div className='recommendation-product__content-title u-truncate'>{ item.title_enc }</div>
              <div className='recommendation-product__content-startto'>
                Mulai dari <span className='recommendation-product__content-price'>{ item.price_start_from }</span>
              </div>
            </div>
          </a>
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
      { image_url: RecommendationProductPlaceholder, title_enc: 'Hotlist', price_start_from: 'Rp 0' }
    ]

    const hotlists = this._verifyHotlistData(placeholder)

    return (
      <div className='u-clearfix'>
        <TextHeader textType={2} injectClassName='recommendation-product__title'>
          Hot List
        </TextHeader>
        <div className='recommendation-product-container'>
          <div className='recommendation-product__contents'>
            {hotlists.map(this._renderHotlistItem) }

            <div className='u-clearfix' />
            <div className='recommendation-product__see-all'>
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
