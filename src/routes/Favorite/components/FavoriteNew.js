import React, { Component, PropTypes } from 'react'
import deepEqual from 'deep-equal'
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
import Unfavorited from './Unfavorited'
import lang from '../../../lib/utils/Lang'
import { replaceFavorites, updatePage, updateQuery } from '../module'

const FAVORITE_PER_PAGE = 10

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
    updatePage: PropTypes.func,
    updateQuery: PropTypes.func,
    userID: PropTypes.number,
    favorite:  PropTypes.object, // object returned from graphql
    favorites: PropTypes.arrayOf(PropTypes.object) // our redux state that's actually calculated
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
      const fv = nextProps.favorite || { count: 0, has_next_page: false, items: [], total_data: 0 }
      const favorites = fv.items || []
      const newFavorites = favorites.map(fv => Object.assign({},fv, { isLoved: true }))

      this.props.replaceFavorites(newFavorites)
      this.setState({ query: nextProps.query })
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
                          nekot={this.props.data.favorite.token}/>
                        : <Unfavorited
                          userID={this.props.userID}
                          shopID={parseInt(item['shop_id'])}
                          shopName={parseInt(item['shop_name'])}
                          nekot={this.props.data.favorite.token} />
                      }
                    </div>
                    <div className='u-clearfix'></div>
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
    console.log(this.props.data)
    if (this.props.data.loading) {
      return <ModuleSpinner />
    }
    const favorites = this.props.data.favorite.data
    if(favorites === undefined || favorites === null){ 
      return (
        <div className='favorite-container u-clearfix'>
          <FavoriteEmpty />
        </div>  
      )
    }
    const isNoFavorite = favorites.length === 0 && !this.props.data.loading && this.props.query === ''
    const isEmptyResult = favorites.length === 0 && !this.props.data.loading && this.props.query !== ''
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
            { favorites.length > 0 && this.renderFavorites(favorites) }
          </div>
          {
            this.props.hasNextPage &&
            <LoadMore onClick={this.viewMore}>
              {lang[this.props.lang]['View More']}
            </LoadMore>
          }
        </div>
    )
  }
}

const FaveQuery = gql`
query Query ($userID: Int!, $page: Int!, $count: Int!, $shop: String){
  favorite (user_id:$userID, page: $page, count: $count, shop: $shop){
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
}
`
const mapDispatchToProps = {
  replaceFavorites, updatePage, updateQuery
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    favorite: state['favorite'] ? state['favorite'].favorite : state.favorite
  }
}
const FavoriteWithData = graphql(FaveQuery, {
  options: ({ userID, count, page, shop }) => ({
    variables: { userID, count: FAVORITE_PER_PAGE, page, shop },
    forceFetch: true,
    returnPartialData: true
  }),
  props: ({ data: { loading, favorite, fetchMore } }) => {
    return {
      loading,
      favorite,
      fetchMore: (newQuery = '', nextPage = 1) => {
        fetchMore({
          variables: { query: newQuery, page: nextPage },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            const newFV = fetchMoreResult.data.favorite
            return Object.assign({}, prev, {
              favorite: Object.assign({}, prev.get_feed, {
                has_next_page: newFV['has_next_page'],
                total_data: newFV['total_data'],
                items: newFV.items
              })
            })
          }
        })
      }
    }
  }
})(Favorite)

export default (connect(mapStateToProps, mapDispatchToProps)(FavoriteWithData))
// export default graphql(FaveQuery, {
//   options: ({ userID, count, page, shop }) => ({
//     variables: { userID, count, page, shop },
//     forceFetch: true,
//     returnPartialData: true
//   })
// })(connect(mapStateToProps, mapDispatchToProps)(Favorite))
