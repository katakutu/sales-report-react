import React, { Component } from 'react'
import './TopAds.scss'
import TopAdsProduct from './TopAdsProduct'
const sampleProduct = {
  'total_data': 2,
  'display': 'product',
  'items': [
    {
      'id': '377768',
      'ad_ref_key': `SkhTSHZ6d2pYeXdYRHBia25WTUlUdmJNanZoR3lwYVBsSll1U2h
      UUGNJY0ZQdGlIS2tkOTZhY2QxZS0yZjZhLTRmNTktNDdjMy1kMzNjYzAyNGJmNWI`,
      'redirect': 'https://m-staging.tokopedia.com/gungunshop',
      'sticker_id': '3',
      'sticker_image': 'https://cdn-staging.tokopedia.com/img/ads_microsite/promo-toa.png',
      'product_click_url': 'https://ta-staging.tokopedia.com/promo/v1/clicks/HptpoprRosKEH_th6sJ76AedHsJfoAyEHsnFHn?alg=def&ab_test=N&uid=5481152&src=fav_product&t=mobile&r=https%3A%2F%2Fm-staging.tokopedia.com%2Fgungunshop%2Fkotak-pensil-5%3Fsrc%3Dtopads',
      'shop_click_url': 'https://ta-staging.tokopedia.com/promo/v1/clicks/HptpoprRosKEH_th6sJ76AedHsJfoAyEHsnFHn?uid=5481152&r=https%3A%2F%2Fm-staging.tokopedia.com%2Fgungunshop&t=mobile&src=fav_product&alg=def&ab_test=N',
      'product': {
        'id': '14266610',
        'name': 'Kotak Pensil 5',
        'image': {
          'm_ecs': 'https://ecs12.tokopedia.net/newimg/cache/300/product-1/2014/11/13/245307/245307_021b5588-6af0-11e4-8ed5-2fc54908a8c2.jpg',
          's_ecs': 'https://ecs12.tokopedia.net/newimg/cache/200-square/product-1/2014/11/13/245307/245307_021b5588-6af0-11e4-8ed5-2fc54908a8c2.jpg',
          'xs_ecs': 'https://ecs12.tokopedia.net/newimg/cache/100-square/product-1/2014/11/13/245307/245307_021b5588-6af0-11e4-8ed5-2fc54908a8c2.jpg'
        },
        'uri': 'https://m-staging.tokopedia.com/gungunshop/kotak-pensil-5?src=topads',
        'relative_uri': 'gungunshop/kotak-pensil-5',
        'price_format': 'Rp 123.456',
        'count_talk_format': '0',
        'count_review_format': '0',
        'product_preorder': false,
        'product_wholesale': false,
        'free_return': 'https://products-staging.tokopedia.com/v1/prosecure/badge?user_id=5480739&shop_id=245307&product_id=14266610',
        'product_cashback': false,
        'product_cashback_rate': ''
      },
      'shop': {
        'id': '245307',
        'name': 'Gun Gun Shop',
        'domain': 'gungunshop',
        'tagline': null,
        'location': 'Jakarta',
        'city': 'Jakarta',
        'image_shop': null,
        'gold_shop': true,
        'lucky_shop': 'https://clover-staging.tokopedia.com/badges/merchant/v1?shop_id=245307',
        'shop_is_official': null,
        'uri': 'https://m-staging.tokopedia.com/gungunshop'
      }
    },
    {
      'id': '377822',
      'ad_ref_key': 'S2dIZ1pVb1lnRFd4VWtBUkFyTXV6UU55V1lVcXhuSXlWdU9xQXh2V0hyZHpTZ2xNZVVjZjdhZjA5ZS1lNGE4LTQzNjktNjVhNy0wYzQ1MTdlMDFmYWY',
      'redirect': 'https://m-staging.tokopedia.com/namirapratiwi',
      'sticker_id': '0',
      'sticker_image': '',
      'product_click_url': 'https://ta-staging.tokopedia.com/promo/v1/clicks/HAtpoprdHsUEH_ta6sJ76AedHsJfoAyEHsnFHn?uid=5481152&r=https%3A%2F%2Fm-staging.tokopedia.com%2Fnamirapratiwi%2Fjaket-kulit%3Fsrc%3Dtopads&t=mobile&alg=def&ab_test=N&src=fav_product',
      'shop_click_url': 'https://ta-staging.tokopedia.com/promo/v1/clicks/HAtpoprdHsUEH_ta6sJ76AedHsJfoAyEHsnFHn?t=mobile&uid=5481152&r=https%3A%2F%2Fm-staging.tokopedia.com%2Fnamirapratiwi&src=fav_product&ab_test=N&alg=def',
      'product': {
        'id': '14264092',
        'name': 'JAKET KULIT',
        'image': {
          'm_ecs': 'https://ecs7.tokopedia.net/img/cache/300/product-1/2016/10/17/14264092/14264092_2e191c3a-426e-42c3-9e2d-5fcccf8d71b3.jpg',
          's_ecs': 'https://ecs7.tokopedia.net/img/cache/200-square/product-1/2016/10/17/14264092/14264092_2e191c3a-426e-42c3-9e2d-5fcccf8d71b3.jpg',
          'xs_ecs': 'https://ecs7.tokopedia.net/img/cache/100-square/product-1/2016/10/17/14264092/14264092_2e191c3a-426e-42c3-9e2d-5fcccf8d71b3.jpg'
        },
        'uri': 'https://m-staging.tokopedia.com/namirapratiwi/jaket-kulit?src=topads',
        'relative_uri': 'namirapratiwi/jaket-kulit',
        'price_format': 'Rp 300.000',
        'count_talk_format': '0',
        'count_review_format': '0',
        'product_preorder': false,
        'product_wholesale': false,
        'free_return': 'https://products-staging.tokopedia.com/v1/prosecure/badge?user_id=5480739&shop_id=478987&product_id=14264092',
        'product_cashback': false,
        'product_cashback_rate': ''
      },
      'shop': {
        'id': '478987',
        'name': 'NAMIRA STORE',
        'domain': 'namirapratiwi',
        'tagline': null,
        'location': 'Kota Bandung',
        'city': 'Kota Bandung',
        'image_shop': null,
        'gold_shop': true,
        'lucky_shop': 'https://clover-staging.tokopedia.com/badges/merchant/v1?shop_id=478987',
        'shop_is_official': null,
        'uri': 'https://m-staging.tokopedia.com/namirapratiwi'
      }
    }
  ]
}

class TopAds extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  render () {
    let tamp = []
    sampleProduct.items.forEach(function (product, index) {
      tamp.push(<TopAdsProduct data={product} key={index} />)
    })
    return (
      <div className='outside__wrapper'>
        { tamp }
      </div>
    )
  }
}

export default TopAds
