import React, { Component } from 'react'
import './TopAds.scss'

class TopAdsProduct extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    key: React.PropTypes.number,
    lang: React.PropTypes.string
  }

  render () {
    const labels = this.props.data['product']['labels'] || []
    const badges = this.props.data['shop']['badges'] || []
    let stickerClass = 'icon-trumpet'

    if (this.props.data['sticker_id'] === 1) {
      stickerClass = 'icon-fire'
    } else if (this.props.data['sticker_id'] === 2) {
      stickerClass = 'icon-thumbsup'
    } else if (this.props.data['sticker_id'] === 3) {
      stickerClass = 'icon-trumpet'
    }

    return (
      <div className='u-col u-col-6 topads__contents' >
        <div className='topads__content-box'>
          <a href={this.props.data['product_click_url']}>
            <img src={this.props.data['product']['image']['m_ecs']} className='topads__img' alt='tokopedia' />
            <div className='topads__title'>{this.props.data['product']['name']}</div>
          </a>
          <div className='topads__price u-truncate'>{this.props.data['product']['price_format']}</div>
          <div className='topads__type-marketing u-truncate'>
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
                    className='topads__label'
                    key={`topads-${this.props.key}-label-${li}`}
                    style={style}>
                    {label['title']}
                  </span>
                )
              })
            }
            {
              labels.length === 0 &&
              <span className='topads__label' style={{ backgroundColor: '#ffffff' }}>&nbsp;</span>
            }
          </div>
          <a href={this.props.data['shop_click_url']}>
            <div className='topads__shop-name u-truncate'>
              <i className={stickerClass} />
              {this.props.data['shop']['name']}
            </div>
          </a>
          <div className='topads__shop-loc-badge'>
            <span className='topads__shop-location u-truncate'>
              <i className='icon-location' /> {this.props.data['shop']['location']}
            </span>
            <span className='topads__badges'>
              {
                badges.map((badge, bi) => {
                  return (
                    <img
                      alt={badge['title']}
                      className='topads__img-badge'
                      key={`topads-${this.props.key}-badge-${bi}`}
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
