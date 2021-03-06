import React, { Component } from 'react'
import ImpressionTracker from '../Events/ImpressionTracker'
import './TopAds.scss'

class TopAdsProduct extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  render () {
    const labels = this.props.data['product']['labels'] || []
    const badges = this.props.data['shop']['badges'] || []

    return (
      <ImpressionTracker url={this.props.data['product']['image']['s_url']}
        urlMatch={this.props.data['product']['image']['s_ecs']}>
        <div className='u-col u-col-6 topads__contents'>
          <div className='topads__content-box'>
            <a href={this.props.data['product_click_url']}>
              <img src={this.props.data['product']['image']['s_ecs']} className='topads__img' alt='tokopedia' />
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
                      key={`topads-label-${li}`}
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
                        key={`topads-badge-${bi}`}
                        src={badge['image_url']} />
                    )
                  })
                }
              </span>
            </div>
          </div>
        </div>
      </ImpressionTracker>
    )
  }
}

export default TopAdsProduct
