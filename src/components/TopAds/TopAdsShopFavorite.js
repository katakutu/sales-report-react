import React, { Component } from 'react'
import ImpressionTracker from '../Events/ImpressionTracker'
import './TopAds.scss'

class TopAdsShopFavorite extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    shops: React.PropTypes.object,
    lang: React.PropTypes.string
  }

  render () {
    const imageProduct = this.props.data['shop']['image_product'] || []

    return (
      <ImpressionTracker url={this.props.data['shop']['image_shop']['s_url']}
        urlMatch={this.props.data['shop']['image_shop']['s_ecs']}>
        <div className='u-col u-col-12 topads__shops__contents'>
          <div className='topads__content-box u-truncate'>
            <a href={this.props.data['shop_click_url']} className='u-truncate'>
              <div className='u-col u-col-3'>
                <img src={this.props.data['shop']['image_shop']['s_ecs'] || ''}
                  className='topads__shop__img' alt='tokopedia' />
              </div>
              <div className='u-col u-col-9'>
                <div className='topads__title small shop'>
                  { this.props.data['shop']['gold_shop'] &&
                    <img
                      alt='gold_shop'
                      className='topads__shop__badges'
                      src='https://ecs1.tokopedia.net/img/gold-active-large.png' />
                  }
                  {this.props.data['shop']['name']}
                </div>
                <div className='topads__shop__tagline'>
                  {this.props.data['shop']['tagline']}
                </div>
              </div>
            </a>
            <div className='u-col u-col-12 u-truncate'>
              <div className='u-col u-col-5'>
                <div className='u-truncate'>
                  {
                    imageProduct.map((img, bi) => {
                      if (bi < 3) {
                        return (
                          <div className='u-col u-col-4' key={`topads-shop-product-${bi}`}>
                            <img
                              alt={img['title']}
                              className='topads__img__shop__product small'
                              src={img['image_url']} />
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </div>
              <div className='u-col u-col-7'>
                <a className='topads__shop__favorite-btn small green' href={this.props.data['shop_click_url']}>
                  +&nbsp;Favorite
                </a>
              </div>
            </div>
          </div>
        </div>
      </ImpressionTracker>
    )
  }
}

export default TopAdsShopFavorite
