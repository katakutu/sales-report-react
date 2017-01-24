import React, { Component, PropTypes } from 'react'
import deepEqual from 'deep-equal'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Img from 'react-image-fallback'
import { HOSTNAME } from './../../../constants'

import ModuleSpinner from './../../../components/Loading/ModuleSpinner'

import GTM from '../../../lib/utils/GTM'
import lang from '../../../lib/utils/Lang'
import loading from '../../../static/media/images/lite-loading.png'
// import greyLove from '../../WishList/assets/love-grey.png'
import location from '../../WishList/assets/location.png'
import goldMerchant from '../../../components/HeaderHomeOld/assets/nav-gold-merchant-logo.png'
import FavoriteSearchEmpty from './FavoriteSearchEmpty'
import FavoriteEmpty from './FavoriteEmpty'
import Favorited from './Favorited'
import Unfavorited from './Unfavorited'
import {
  addFavorite,
  clearFavorites,
  replaceFavorites,
  updateHasNextPage,
  updateTotalFavorite
} from '../module'

class Favorite extends Component {
  static propTypes = {
    addFavorite: PropTypes.func,
    clearFavorites: PropTypes.func,
    count: PropTypes.number,
    data: PropTypes.object,
    lang: React.PropTypes.string,
    page: PropTypes.number,
    query: PropTypes.string,
    replaceFavorites: PropTypes.func,
    shouldRefetch: PropTypes.bool,
    updateHasNextPage: PropTypes.func,
    updateTotalFavorite: PropTypes.func,
    userID: PropTypes.number,
    favorites: PropTypes.arrayOf(PropTypes.object)
  }

  state = {
    favorites: []
  }

  componentWillReceiveProps (nextProps) {
    // comparing only the relevant changes
    const np = {
      count: nextProps.count,
      page: nextProps.page,
      query: nextProps.query,
      favorites: nextProps.favorites
    }
    const tp = {
      count: this.props.count,
      page: this.props.page,
      query: this.props.query,
      favorites: this.props.favorites
    }
    const propsChanged = deepEqual(np, tp)

    if (nextProps['data'] && !nextProps.data.loading && propsChanged) {
      // only add new urls that's not already there
      const data = nextProps['data']['favorite'] && nextProps['data']['favorite']['items']
      const gqlData = data || []
      
      const newData = gqlData.filter(d => !ids.includes(d['id']))
      if (nextProps.query === '' && newData.length > 0) {
        // if returning from search
        if (this.props.query !== '') {
          this.props.clearFavorites()
        }
        this.props.addFavorite(newData)
      } else if (nextProps.query !== '') {
        
        if (nextProps.page > 1) {
          this.props.addFavorite(newData)
        } else {
          this.props.replaceFavorites(gqlData)
        }
      }
      const totalData = nextProps['data']['favorite'] && nextProps['data']['favorite']['total_data']
      // this.props.updateHasNextPage(nextProps['data']['favorite']['has_next_page'] || false)
      // this.props.updateTotalFavorite(totalData || 0)
    }
  }

  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickFavorite', 'Favorite', 'View', item.shop_name)
    }
  }

  renderFavorites (favorites) {
    {
      console.log(favorites)
      console.log(this.props.data)
      console.log("===================")
    }
    return (
      <div className='outside__wrapper'>
        {
          favorites.map((item, index) => {
            const shop_url = `${HOSTNAME}/`+item.shop_name
            let img0 = item.products.length !== 0
            ? <Img src={item.products[0].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let img1 = item.products.length !== 0
            ? <Img src={item.products[1].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let img2 = item.products.length !== 0
            ? <Img src={item.products[2].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let name = item.shop_name.length > 12 ? item.shop_name.substr(0, 12) + '...' : item.shop_name
            let GM = item.is_gold === 'true' ? <Img src={goldMerchant} /> : ''
            return (
              <div className='favorite__item u-clearfix'
                onClick={this._gtmNotifyItemClicked(item)}
                key={`favorite-${index}`}>
                <div className='favorite__wrapper new u-clearfix'>
                  <a aria-hidden='true' tabIndex='-1' href={shop_url} className='favorite__click u-block' />
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
                  <div className='favorite__body u-clearfix u-mtl u-col u-col-8'>
                    { img0 }
                    { img1 }
                    { img2 }
                  </div>
                  <div className='favorite__footer u-clearfix u-mt1 u-col u-col-4'>
                    <div className='u-col u-col-12 u-truncate u-relative'>
                    {
                      favorites['isActive']
                        ? <Favorited
                          userID={this.props.userID}
                          productID={parseInt(item['id'])}
                          productName={item['name']} />
                        : <Unfavorited
                          userID={this.props.userID}
                          productID={parseInt(item['id'])}
                          productName={item['name']} />
                    }
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

  render () {
    if (this.props.data.loading) {
      return <ModuleSpinner />
    }
    const favorites = this.props.data.favorites
    const isNoFavorite = favorites.length === 0 && !this.props.data.loading && this.props.query === ''
    const isEmptyResult = favorites.length === 0 && !this.props.data.loading && this.props.query !== ''
    
    return (
      <div className='favorite-container u-clearfix'>
        { isNoFavorite && <FavoriteEmpty /> }
        { isEmptyResult && <FavoriteSearchEmpty /> }
        { favorites.length > 0 && this.renderFavorites(favorites) }
      </div>
    )
  }
}
// { favorites.length > 0 && this.renderFavorites() }
const FaveQuery = gql`
query Query ($userID: Int!, $query: String!, $count: Int!, $page: Int!){
  favorites (user_id:$userID, query: $query, count: $count, page: $page){
    shop_id
    domain
    shop_name
    shop_pic
    shop_url
    location
    is_gold
    is_official
    is_active
    products {
      id
      name
      img_url
    }
  }
}
`
const mapDispatchToProps = {
  addFavorite,
  clearFavorites,
  replaceFavorites,
  updateHasNextPage,
  updateTotalFavorite
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    favorites: state['favorite'] ? state['favorite'].favorites : state.favorites
  }
}
export default graphql(FaveQuery, {
  options: ({ userID, query, count, page }) => ({
    variables: { userID, query, count, page },
    forceFetch: true,
    returnPartialData: true
  })
})(connect(mapStateToProps, mapDispatchToProps)(Favorite))
