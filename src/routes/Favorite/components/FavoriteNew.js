import React, { Component, PropTypes } from 'react'
// import deepEqual from 'deep-equal'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { browserHistory } from 'react-router'
import gql from 'graphql-tag'
import Img from 'react-image-fallback'
import { HOSTNAME } from './../../../constants'

import ModuleSpinner from './../../../components/Loading/ModuleSpinner'

import GTM from '../../../lib/utils/GTM'
import loading from '../../../static/media/images/lite-loading.png'
// import greyLove from '../../WishList/assets/love-grey.png'
import location from '../../WishList/assets/location.png'
import goldMerchant from '../../../components/HeaderHomeOld/assets/nav-gold-merchant-logo.png'
import FavoriteSearchEmpty from './FavoriteSearchEmpty'
import FavoriteEmpty from './FavoriteEmpty'
import Favorited from './Favorited'
import LoadMore from '../../../components/LoadMore'
import Unfavorited from './Unfavorited'
import lang from '../../../lib/utils/Lang'
import ArrayHelper from '../../../lib/utils/ArrayHelper'
import TopAdsIntegrate from '../../../components/TopAds/TopAdsIntegrate'
import { replaceFavorites, updatePage, updateQuery } from '../module'

class Favorite extends Component {
  static propTypes = {
    addFavorite: PropTypes.func,
    clearFavorites: PropTypes.func,
    count: PropTypes.number,
    fetchMore: PropTypes.func,
    loading: PropTypes.bool,
    data: PropTypes.object,
    lang: React.PropTypes.string,
    page: PropTypes.number,
    query: PropTypes.string,
    replaceFavorites: PropTypes.func,
    shouldRefetch: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    updatePage: PropTypes.func,
    updateQuery: PropTypes.func,
    userID: PropTypes.number,
    favorite:  PropTypes.object, // object returned from graphql
    favorites: PropTypes.arrayOf(PropTypes.object), // our redux state that's actually calculated
    ep: React.PropTypes.string,
    src: React.PropTypes.string,
    item: React.PropTypes.number,
    q: React.PropTypes.string,
    topAdsReudyx: PropTypes.object,
    topads: PropTypes.object,
    loading: PropTypes.bool
  }

  state = {
    favorites: [],
    page: this.props.page,
    query: this.props.query
  }

  constructor (props) {
    super(props)

    this.viewMore = this.viewMore.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.searchFavorite = this.searchFavorite.bind(this)
    this.updateFinalQuery = this.updateFinalQuery.bind(this)
  }

  resetSearch () {
    this.setState({ finalQuery: '', query: '' })
    browserHistory.push({
      pathname: '/fave'
    })
  }

  searchFavorite (event) {
    this.setState({ query: event.target.value })
  }

  updateFinalQuery (event) {
    if (event.key === 'Enter') {
      this.props.updateQuery(this.state.query)
      event.target.blur()

      if (this.state.query === '') {
        this.setState({ page: 1 })
      }

      browserHistory.push({
        pathname: '/fave'
      })
    }
  }

  viewMore (event) {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.props.fetchMore(this.props.query, this.state.page)
      browserHistory.push({
        pathname: '/fave',
        query: { page: this.state.page }
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.loading) {
      const oldData = this.props.favorites
      // get from graphql favorite
      const fv = nextProps.favorite || { has_next_page: false, items: [], total_data: 0 }
      const favorites = fv.data || []
      const newFavorites = favorites.map(fd => Object.assign({}, fd))
      // get from graphql topads
      const ta = nextProps.topads || { display: '', items: [], total_data: 0 }
      const topAds = ta.items || []
      const newTopAds = topAds.map(ta => Object.assign({}, ta, { isActive: false }))
      // make structure 2d
      const newData = [
        { kind: 'topads', display: ta['display'], items: newTopAds },
        { kind: 'favorites', items: newFavorites }
      ]
      // check new data already there
      if (favorites.length !== 0) {
        // check if new data same to old data
        const oldIDs = oldData.map(fd => {
          return fd['kind'] === 'favorites' && fd['items'].map(c => (c['shop_id']))
        })
        const newIDs = newData.map(ta => {
          return ta['kind'] === 'favorites' && ta['items'].map(x => (x['shop_id']))
        })
        if (ArrayHelper.notEquals(oldIDs.length > 0 ? oldIDs[1] : oldIDs, newIDs[1])) {
          // update new data with old one
          const payload = [...oldData, ...newData]
          this.props.replaceFavorites(payload)
        }
      }
    }
  }


  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickFavorite', 'Favorite', 'View', item.shop_name)
    }
  }

  renderFavorites (favorites) {
    return (
      <div className='outside__wrapper'>
        {
          favorites.map((item, index) => {
            const shopUrl = `${HOSTNAME}/` + item.shop_name
            let img0 = item.products[0] !== undefined
            ? <Img src={item.products[0].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let img1 = item.products[1] !== undefined
            ? <Img src={item.products[1].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let img2 = item.products[2] !== undefined
            ? <Img src={item.products[2].img_url} initialImage={loading} fallbackImage={loading} /> : ''
            let name = item.shop_name.length > 12 ? item.shop_name.substr(0, 12) + '...' : item.shop_name
            let GM = item.is_gold === 'true' ? <Img src={goldMerchant} /> : ''
            return (
              <div className='favorite__item u-clearfix'
                onClick={this._gtmNotifyItemClicked(item)}
                key={`favorite-${index}`}>
                <div className='favorite__wrapper new u-clearfix'>
                  <a aria-hidden='true' tabIndex='-1' href={shopUrl} className='favorite__click u-block' />
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
                    <div className='u-col u-col-8 img_prod'>
                      { img0 }
                      { img1 }
                      { img2 }
                    </div>
                    <div className='u-col u-col-4 u-truncate u-relative btn'>
                      {
                      favorites['isActive']
                        ? <Favorited
                          userID={this.props.userID}
                          shopID={parseInt(item['shop_id'])}
                          shopName={parseInt(item['shop_name'])}
                          nekot={this.props.favorite.token} />
                        : <Unfavorited
                          userID={this.props.userID}
                          shopID={parseInt(item['shop_id'])}
                          shopName={parseInt(item['shop_name'])}
                          nekot={this.props.favorite.token} />
                      }
                    </div>
                    <div className='u-clearfix' />
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
    if (this.props.loading) {
      return <ModuleSpinner />
    }
    const fav = this.props.favorite
    let favorit
    if (fav) {
      favorit = this.props.favorite.data
    }
    if (favorit === undefined || favorit === null) {
      return (
        <div className='favorite-container u-clearfix'>
          <FavoriteEmpty />
        </div>
      )
    }
    const favorites = this.props.favorites || []
    const isNoFavorite = favorites.length === 0 && !this.props.loading && this.props.query === ''
    const isEmptyResult = favorites.length === 0 && !this.props.loading && this.props.query !== ''
    let flCount = favorites.length
    return (
      <div className='u-clearfix favorite favorite--single-page u-mt2'>
        <div className='favorite__searchbar-holder'>
          <i className='favorite__icon favorite__love-grey favorite__set-love-grey' />
          <input
            type='text'
            name='searchwishlist'
            className='favorite__searchbar'
            placeholder={lang[this.props.lang]['Search Shop in Favorite']}
            onChange={this.searchFavorite}
            onKeyPress={this.updateFinalQuery}
            value={this.state.query} />
        </div>


        <div className='favorite__searchbar-holder'>
          <i className='favorite__icon favorite__location-grey favorite__set-love-grey' />
          <input
            type='text'
            name='searchwishlist'
            className='favorite__searchbar'
            placeholder={lang[this.props.lang]['Cari lokasi']} />
        </div>
        {
          // this.state.finalQuery !== '' &&
          //   [
          //   (
          //     <div className='u-col u-col-6'>
          //       <p className='favorite__search-result'>{flCount} {lang[this.props.lang]['Hasil']}</p>
          //     </div>
          //   ),
          //   (
          //     <div className='u-col u-col-6' onClick={this.resetSearch}>
          //       <span className='favorite__reset-search'>Reset</span>
          //     </div>
          //   ),
          //   (<div className='u-clearfix' />)
          //   ]
        }

        <div className='u-clearfix' />
        <div className='favorite-container u-clearfix'>
          { isNoFavorite && <FavoriteEmpty /> }
          { isEmptyResult && <FavoriteSearchEmpty /> }
          {
            favorites.length > 0 && favorites.map((favorite, index) => {
              const key1 = `favorite-cont-${index}`
              const key2 = `topads-cont-${index}`
              if (favorite['kind'] === 'favorites') {
                return (
                  <div className='row-fluid' key={key1}>
                    { this.renderFavorites(favorite['items'], index)}
                  </div>
                )
              } else if (favorite['kind'] === 'topads') {
                return (
                  <div className='row-fluid' key={key2} >
                    <TopAdsIntegrate dataAds={favorite} />
                  </div>
                )
              }
            })
          }
        </div>
        {
          fav['has_next_page'] &&
          <LoadMore onClick={this.viewMore}>
            {lang[this.props.lang]['View More']}
          </LoadMore>
        }
      </div>
    )
  }
}

const FaveQuery = gql`
query Query ($userID: Int!, $page: Int!, $count: Int!,
$ep: String!, $src: String!, $item: Int!, $q: String!, $query: String!)
{
  favorite (user_id:$userID, page: $page, count: $count, shop: $query){
    has_next_page
    token
    data{
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
  topads (userID:$userID, ep: $ep, src: $src, item: $item, page: $page, q: $q)
  {
    total_data
    display
    items {
      id
      ad_ref_key
      redirect
      product_click_url
      shop_click_url
      product {
        id
        name
        image {
          s_ecs
          s_url
        }
        uri
        relative_uri
        price_format
        product_preorder
        product_wholesale
        free_return
        product_cashback
        product_cashback_rate
        labels {
          title
          color
        }
      }
      shop {
        id
        name
        tagline
        location
        city
        image_product {
          product_id
          product_name
          image_url
        }
        image_shop {
          s_ecs
          s_url
        }
        gold_shop
        lucky_shop
        shop_is_official
        uri
        badges {
          title
          image_url
        }
      }
    }
    }
}
`
const mapDispatchToProps = {
  replaceFavorites, updatePage, updateQuery
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    page: state['favorite'] ? state['favorite'].page : state.page,
    query: state['favorite'] ? state['favorite'].query : state.query,
    favorites: state['favorite'] ? state['favorite'].favorites : state.favorites
  }
}
const FavoriteWithData = graphql(FaveQuery, {
  options: ({ userID, count, page, ep, src, item, q, query }) => ({
    variables: { userID, count, page, ep, src, item, q, query },
    forceFetch: true,
    returnPartialData: true
  }),
  props: ({ data: { loading, topads, favorite, fetchMore } }) => {
    return {
      loading,
      favorite,
      topads,
      fetchMore: (newQuery = '', nextPage = 1) => {
        fetchMore({
          variables: { query: newQuery, page: nextPage },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            const newFV = fetchMoreResult.data.favorite
            const newTA = fetchMoreResult.data.topads
            return Object.assign({}, prev, {
              favorite: Object.assign({}, prev.favorite, {
                has_next_page: newFV['has_next_page'],
                total_data: newFV['total_data'],
                data: newFV.data
              }),
              topads: Object.assign({}, prev.topads, {
                display: newTA['display'],
                total_data: newTA['total_data'],
                items: newTA.items
              })
            })
          }
        })
      }
    }
  }
})(Favorite)

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteWithData)
// export default graphql(FaveQuery, {
//   options: ({ userID, count, page, shop }) => ({
//     variables: { userID, count, page, shop },
//     forceFetch: true,
//     returnPartialData: true
//   })
// })(connect(mapStateToProps, mapDispatchToProps)(Favorite))
