import React, { Component } from 'react'
import './TopAds.scss'
import Img from 'react-image-fallback'

// import GTM from '../../../lib/utils/GTM'
import lang from '../../lib/utils/Lang'
import loading from '../../static/media/images/lite-loading.png'
import greyLove from '../../routes/WishList/assets/love-grey.png'
import location from '../../routes/WishList/assets/location.png'
import goldMerchant from '../HeaderHomeOld/assets/nav-gold-merchant-logo.png'

class TopAdsProduct extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    key: React.PropTypes.number,
    lang: React.PropTypes.string
  }

  render () {
    let GM = this.props.data.is_gold === 'true' ? <Img src={goldMerchant} /> : ''
    return (
      <div className='favorite__data u-clearfix' key={this.props.key}>
        <div className='favorite__wrapper new u-clearfix'>
          <a aria-hidden='true' tabIndex='-1' href={this.props.data.uri} className='favorite__click u-block' />
          <div className='favorite__header'>
            <Img src={this.props.data.product.image.m_ecs}
              initialImage={loading}
              fallbackImage={loading}
              className='u-col u-col-4 u-fit u-block u-mx-auto favorite__image'
              alt={`${this.props.data.title} image`} />
            <div className='u-col u-col-8 favorite__text'>
              <div className='u-col u-col-12 favorite__title'>{ this.props.data.product.name }</div>
              <div className='u-col u-col-10 favorite__city'>
                <Img src={location} className='icon_location' initialImage={loading} fallbackImage={loading} />
                {this.props.data.location}
              </div>
              <div className='u-col u-col-2 icon_gm'>{GM}</div>
            </div>
          </div>
          <div className='favorite__footer u-clearfix u-mt1 u-col u-col-4'>
            <div className='u-col u-col-12 u-truncate u-relative'>
              <a href={this.props.data.shop_url2}>
                <Img src={greyLove} className='icon_love' initialImage={loading} fallbackImage={loading} />
                  Ikuti
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopAdsProduct
