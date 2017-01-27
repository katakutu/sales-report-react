import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Img from 'react-image-fallback'

import ModuleSpinner from './../../../components/Loading/ModuleSpinner'

import GTM from '../../../lib/utils/GTM'
import lang from '../../../lib/utils/Lang'
import loading from '../../../static/media/images/lite-loading.png'
import greyLove from '../../WishList/assets/love-grey.png'
import location from '../../WishList/assets/location.png'
import goldMerchant from '../../../components/HeaderHomeOld/assets/nav-gold-merchant-logo.png'

class Favorite extends Component {
  static propTypes = {
    data: PropTypes.object,
    lang: React.PropTypes.string
  }

  state = {
    favorites: []
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps['data'] && !nextProps.data.loading) {
      // only add new urls that's not already there
      const data = nextProps['data']['favorite'] && nextProps['data']['favorite']['items']
      const gqlData = data || []
      const newData = gqlData.filter(data => {
        return true
      })

      this.setState({
        favorites: this.state.favorites.concat(newData)
      })
    }
  }

  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickFavorite', 'Favorite', 'View', item.shop_name)
    }
  }

  render () {
    if (this.props.data.loading) {
      return <ModuleSpinner />
    }
    return (
      <div className='outside__wrapper'>
        {
          this.props.data.promoted.map((item, index) => {
            let img0 = item.products.length !== 0
            ? <Img src={item.products[0].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let img1 = item.products.length !== 0
            ? <Img src={item.products[1].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let img2 = item.products.length !== 0
            ? <Img src={item.products[2].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let name = item.shop_name.length > 12 ? item.shop_name.substr(0, 12) + '...' : item.shop_name
            let GM = item.is_gold === 'true' ? <Img src={goldMerchant} /> : ''
            return (
              <div className='favorite__item u-col u-col-6'
                onClick={this._gtmNotifyItemClicked(item)}
                key={`favorite-${index}`}>
                <div className='favorite__wrapper'>
                  <a aria-hidden='true' tabIndex='-1' href={item.shop_url2} className='favorite__click u-block' />
                  <div className='favorite__header'>
                    <Img src={item.shop_pic}
                      initialImage={loading}
                      fallbackImage={loading}
                      className='u-col u-col-4 u-fit u-block u-mx-auto favorite__image'
                      alt={`${item.title} image`} />
                    <div className='u-col u-col-8 favorite__text'>
                      <div className='u-col u-col-12 favorite__title'>{ name }</div>
                      <div className='u-col u-col-10 favorite__city'>
                        <Img src={location} className='icon_location' initialImage={loading} fallbackImage={loading} />
                        {item.location}
                      </div>
                      <div className='u-col u-col-2 icon_gm'>{GM}</div>
                    </div>
                  </div>
                  <div className='favorite__body u-clearfix u-mtl'>
                    { img0 }
                    { img1 }
                    { img2 }
                  </div>
                  <div className='favorite__footer u-clearfix u-mt1'>
                    <div className='u-clearfix'>
                      <div className='u-col u-col-12 u-truncate u-relative'>
                        <a href={item.shop_url2}>
                          <Img src={greyLove} className='icon_love' initialImage={loading} fallbackImage={loading} />
                          &nbsp;{ lang[this.props.lang]['Ikuti'] }
                        </a>
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
  promoted {
    shop_id
    domain
    shop_name
    shop_pic
    shop_url
    location
    is_gold
    is_official
    products {
      id
      name
      img_url
    }
  }
}
`

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default graphql(FaveQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, undefined)(Favorite))
