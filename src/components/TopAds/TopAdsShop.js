import React, { Component } from 'react'
import './TopAds.scss'

class TopAdsShop extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    shops: React.PropTypes.object,
    lang: React.PropTypes.string,
    eventShopClick: React.PropTypes.func
  }

  render () {
    const imageProduct = this.props.data['shop']['image_product'] || []
    let shopFavButton = <a className='topads__shop__favorite-btn green'
      onClick={() => this.props.eventShopClick(this.props.data['id'], this.props.data['ad_ref_key'], 'add')}>
      +&nbsp;Favorite
    </a>

    if (this.props.shops) {
      if (this.props.shops[this.props.data['id']]['state']) {
        shopFavButton = <a className='topads__shop__favorite-btn'
          onClick={() => this.props.eventShopClick(this.props.data['id'], this.props.data['ad_ref_key'], 'add')}>
          <i className='icon-checked' />&nbsp;&nbsp;&nbsp;Favorited
        </a>
      } else {
        shopFavButton = <a className='topads__shop__favorite-btn green'
          onClick={() => this.props.eventShopClick(this.props.data['id'], this.props.data['ad_ref_key'], 'add')}>
          +&nbsp;Favorite
        </a>
      }
    }

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
          { shopFavButton }
        </div>
      </div>

    )
  }
}

export default TopAdsShop
