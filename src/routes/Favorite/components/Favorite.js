import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Img from 'react-image-fallback'

import GTM from '../../../lib/utils/GTM'
import loading from '../../../static/media/images/lite-loading.png'
import greyLove from '../../WishList/assets/love-grey.png'
import location from '../../WishList/assets/location.png'
import goldMerchant from '../../../components/HeaderHomeOld/assets/nav-gold-merchant-logo.png'

class Favorite extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  state = {
    hotlists: []
  }

  constructor (props) {
    super(props)

    this._gtmNotifyItemClicked = this._gtmNotifyItemClicked.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps['data'] && !nextProps.data.loading) {
      // only add new urls that's not already there
      const urls = this.state.hotlists.map(h => h['url'])
      const data = nextProps['data']['hot_product_list'] && nextProps['data']['hot_product_list']['items']
      const gqlData = data || []
      const newData = gqlData.filter(data => {
        return urls.length === 0 ? true : !urls.includes(data['url'])
      })

      this.setState({
        hotlists: this.state.hotlists.concat(newData)
      })
    }
  }

  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickHotlist', 'Hotlist', 'Click', item.title)
    }
  }

  render () {
    //  onClick={this._gtmNotifyItemClicked(item)} key={`hotlist-${index}`}
    return (
      <div className='outside__wrapper'>
        {
          this.props.data.favorite.map((item, index) => {
            let img0 = item.products.length != 0 ? item.products[0].img_url : loading;
            let img1 = item.products.length != 0 ? item.products[1].img_url : loading;
            let img2 = item.products.length != 0 ? item.products[2].img_url : loading;
            let name = item.shop_name.length > 12 ? item.shop_name.substr(0,12)+'...' : item.shop_name;
            let GM = item.is_gold == 'true' ? <Img src={goldMerchant}/> : '';
            return (
              <div className='favorite__item u-col u-col-6' key={`favorite-${index}`}>
                <div className='favorite__wrapper'>
                  <a aria-hidden='true' tabIndex='-1' href={item.shop_url} className='favorite__click u-block' />
                  <div className='favorite__header'>
                    <Img src={item.img_shop.xs_ecs}
                      initialImage={loading}
                      fallbackImage={loading}
                      className='u-col u-col-4 u-fit u-block u-mx-auto favorite__image'
                      alt={`${item.title} image`} />
                    <div className='u-col u-col-8 favorite__text'>
                      <div className='u-col u-col-12 favorite__title'>{ name }</div>
                      <div className='u-col u-col-10 favorite__city'>
                        <img src={location} className='icon_location'/>{item.location}
                      </div>
                      <div className='u-col u-col-2 icon_gm'>{GM}</div>
                    </div>
                  </div>
                  <div className='favorite__body u-clearfix u-mtl'>
                    <Img src={img0} initialImage={loading} fallbackImage={loading}/>
                    <Img src={img1} initialImage={loading} fallbackImage={loading}/>
                    <Img src={img2} initialImage={loading} fallbackImage={loading}/>
                  </div>
                  <div className='favorite__footer u-clearfix u-mt1'>
                    <div className='u-clearfix'>
                      <div className='u-col u-col-12 u-truncate u-relative'>
                        <a href="#"><img src={greyLove} className='icon_love'/>&nbsp;Favorite</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const FaveQuery = gql`
query Query {
  favorite {
    shop_id
    domain
    shop_name
    shop_url
    location
    city
    is_gold
    is_official
    img_shop {
      cover
      s_url
      xs_url
      cover_ecs
      s_ecs
      xs_ecs
    }
    products {
      id
      name
      img_url
    }
  }
}
`

export default graphql(FaveQuery, {
  options: ({ data }) => ({
    variables: { data },
    returnPartialData: true
  })
})(Favorite)
