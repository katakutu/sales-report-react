import React, { Component } from 'react'
import './TopAds.scss'

class TopAdsShop extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    shops: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  render () {
    const imageProduct = this.props.data['shop']['image_product'] || []

    return (
      <div className='u-col u-col-6 topads__contents'>
        <div className='topads__content-box'>
          <a href={this.props.data['shop_click_url']}>
            <img src={this.props.data['shop']['image_shop']['s_ecs']} className='topads__shop__img' alt='tokopedia' />
            <div className='topads__title shop center'>
              { this.props.data['shop']['gold_shop'] &&
                <img
                  alt='gold_shop'
                  className='topads__shop__badges'
                  src='https://ecs1.tokopedia.net/img/gold-active-large.png' />
              }
              {this.props.data['shop']['name']}
            </div>
          </a>
          <div className='topads__shop__tagline'>
            {this.props.data['shop']['tagline']}
          </div>
          <div className='topads__type-marketing u-truncate'>
            {
              imageProduct.map((img, bi) => {
                if (bi < 3) {
                  return (
                    <div className='u-col u-col-4' key={`topads-shop-product-${bi}`}>
                      <img
                        alt={img['title']}
                        className='topads__img__shop__product'
                        src={img['image_url']} />
                    </div>
                  )
                }
              })
            }
          </div>
          <a className='topads__shop__favorite-btn green' href={this.props.data['shop_click_url']}>
            +&nbsp;Favorite
          </a>
        </div>
      </div>

    )
  }
}

export default TopAdsShop
