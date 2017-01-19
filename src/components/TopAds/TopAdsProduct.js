import React, { Component } from 'react'
import './TopAds.scss'

// import GTM from '../../../lib/utils/GTM'
// import lang from '../../lib/utils/Lang'

class TopAdsProduct extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    key: React.PropTypes.number,
    lang: React.PropTypes.string
  }

  render () {
    const labels = this.props.data['labels'] || []
    const badges = this.props.data['badges'] || []

    return (
      <div className='u-col u-col-6 wishlist__contents' key={`topads-${this.props.key}`}>
        <div className='wishlist__content-box'>
          <a href={this.props.data['product_click_url']}>
            <img src={this.props.data['product']['image']['m_ecs']} className='wishlist__img' alt='tokopedia' />
            <div className='wishlist__title'>{this.props.data['product']['name']}</div>
          </a>
          <div className='wishlist__price u-truncate'>{this.props.data['product']['price_format']}</div>
          <div className='wishlist__type-marketing u-truncate'>
            {
              labels.map((label, li) => {
                let style = { backgroundColor: label['color'] }
                if (label['color'] === '#ffffff') {
                  style = Object.assign(style, {
                    border: '1px solid #bbb',
                    color: '#606060'
                  })
                }

                return (
                  <span
                    className='wishlist__label'
                    key={`wishlist-${this.props.key}-label-${li}`}
                    style={style}>
                    {label['title']}
                  </span>
                )
              })
            }
            {
              labels.length === 0 &&
              <span className='wishlist__label' style={{ backgroundColor: '#ffffff' }}>&nbsp;</span>
            }
          </div>
          <a href={this.props.data['shop']['uri']}>
            <div className='wishlist__shop-name u-truncate'>{this.props.data['shop']['name']}</div>
          </a>
          <div className='wishlist__shop-loc-badge'>
            <span className='wishlist__shop-location u-truncate'>
              <i className='icon-location' /> {this.props.data['shop']['location']}
            </span>
            <span className='wishlist__badges'>
              {
                badges.map((badge, bi) => {
                  return (
                    <img
                      alt={badge['title']}
                      className='wishlist__img-badge'
                      key={`wishlist-${this.props.key}-badge-${bi}`}
                      src={badge['image_url']} />
                  )
                })
              }
            </span>
          </div>
        </div>
      </div>

    )
  }
}

export default TopAdsProduct
