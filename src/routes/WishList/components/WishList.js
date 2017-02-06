import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import { HOSTNAME } from './../../../constants'
import queries from './../../../queries'
import lang from '../../../lib/utils/Lang'
import GTM from '../../../lib/utils/GTM'
import ArrayHelper from '../../../lib/utils/ArrayHelper'
import LoadMore from '../../../components/LoadMore'

import { replaceWishlists, updatePage, updateQuery } from '../module'

import WishlistSearchEmpty from './WishListSearchEmpty'
import WishlistEmpty from './WishlistEmpty'
import WishlistLove from './WishlistLove'
import WishlistUnloved from './WishlistUnloved'
import WishlistTrash from './WishlistTrash'

import './WishListView.scss'

const WISHLIST_PER_PAGE = 20

class WishList extends Component {
  static propTypes = {
    count: PropTypes.number,
    fetchMore: PropTypes.func,
    lang: PropTypes.string,
    loading: PropTypes.bool,
    page: PropTypes.number,
    query: PropTypes.string,
    refetch: PropTypes.func,
    replaceWishlists: PropTypes.func,
    userID: PropTypes.number,
    updatePage: PropTypes.func,
    updateQuery: PropTypes.func,
    wishlist:  PropTypes.object, // object returned from graphql
    wishlists: PropTypes.arrayOf(PropTypes.object) // our redux state that's actually calculated
  }

  state = {
    page: this.props.page,
    query: this.props.query
  }

  constructor (props) {
    super(props)

    this._gtmNotifyBuyButtonClicked = this._gtmNotifyBuyButtonClicked.bind(this)
    this._gtmNotifyWishlistClicked = this._gtmNotifyWishlistClicked.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.searchWishlist = this.searchWishlist.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.viewMore = this.viewMore.bind(this)
  }

  _gtmNotifyBuyButtonClicked () {
    GTM.pushEvent('clickWishlist', 'Wishlist', 'Buy', 'Buy')
  }

  _gtmNotifyWishlistClicked (wishlist) {
    return (event) => {
      GTM.pushEvent('clickWishlist', 'Wishlist', 'View', wishlist['name'])
    }
  }

  resetSearch () {
    this.setState({
      query: '',
      page: 1
    }, () => {
      this.props.updateQuery('')

      browserHistory.push({
        pathname: '/wishlist'
      })
    })
  }

  searchWishlist (event) {
    if (event.key === 'Enter') {
      this.props.updateQuery(this.state.query)
      event.target.blur()

      this.setState({ page: 1 }, () => {
        browserHistory.push({
          pathname: '/wishlist'
        })
      })
    }
  }

  updateQuery (event) {
    this.setState({ query: event.target.value })
  }

  viewMore () {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.props.fetchMore(this.props.query, this.state.page)
      browserHistory.push({
        pathname: '/wishlist',
        query: { page: this.state.page }
      })
    })
  }

  renderWishlists (wishlists, parentIndex) {
    return wishlists.map((wishlist, index) => {
      const currentPage = window.location.href
      const mainLink = `${HOSTNAME}/add-to-cart.pl`
      const buyLink = `${mainLink}?refback=${currentPage}&id=${wishlist['id']}&referer=${currentPage}`

      const labels = wishlist['labels'] || []
      const badges = wishlist['badges'] || []

      const trash = (
        <WishlistTrash
          userID={this.props.userID}
          productID={parseInt(wishlist['id'])}
          productName={wishlist['name']}
          onDeleted={() => this.props.refetch()} />
      )
      const actionButton = wishlist['available'] ? (
        <div className='wishlist__buy'>
          { trash }
          <a href={buyLink} className='wishlist__button-buy' onClick={this._gtmNotifyBuyButtonClicked}>
            { lang[this.props.lang]['Buy'] }
          </a>
        </div>
      ) : (
        <div className='wishlist__buy'>
          { trash }
          <a disabled className='wishlist__button-no-stock'>
            { lang[this.props.lang]['Out of Stock'] }
          </a>
        </div>
      )

      return (
        <div className='u-col u-col-6 wishlist__contents' key={`wishlist-${parentIndex}-${index}`}>
          <div className='wishlist__content-box wishlist__item'>
            {
              wishlist['isActive']
                ? <WishlistLove
                  userID={this.props.userID}
                  productID={parseInt(wishlist['id'])}
                  productName={wishlist['name']} />
                : <WishlistUnloved
                  userID={this.props.userID}
                  productID={parseInt(wishlist['id'])}
                  productName={wishlist['name']} />
            }
            <a href={wishlist['url']} onClick={this._gtmNotifyWishlistClicked(wishlist)}>
              <img src={wishlist['image']} className='wishlist__img' alt='tokopedia' />
              <div className='wishlist__title'>{wishlist['name']}</div>
            </a>
            <div className='wishlist__price u-truncate'>{wishlist['price_formatted']}</div>
            <div className='wishlist__type-marketing u-truncate'>
              {
                labels.map((label, li) => {
                  let style = { backgroundColor: label['color'] }
                  if (label['color'] === '#ffffff') {
                    style = Object.assign(style, {
                      border: '1px solid #bbb',
                      color: '#606060'
                    })
                  }

                  return (
                    <span
                      className='wishlist__label'
                      key={`wishlist-${index}-label-${li}`}
                      style={style}>
                      {label['title']}
                    </span>
                  )
                })
              }
              {
                labels.length === 0 &&
                <span className='wishlist__label' style={{ backgroundColor: '#ffffff' }}>&nbsp;</span>
              }
            </div>
            <a href={wishlist['shop']['url']}>
              <div className='wishlist__shop-name u-truncate'>{wishlist['shop']['name']}</div>
            </a>
            <div className='wishlist__shop-loc-badge'>
              <span className='wishlist__shop-location u-truncate'>
                <i className='icon-location' /> {wishlist['shop']['location']}
              </span>
              <span className='wishlist__badges'>
                {
                  badges.map((badge, bi) => {
                    return (
                      <img
                        alt={badge['title']}
                        className='wishlist__img-badge'
                        key={`wishlist-${index}-badge-${bi}`}
                        src={badge['image_url']} />
                    )
                  })
                }
              </span>

              { actionButton }
            </div>
          </div>
        </div>

      )
    })
  }

  componentWillReceiveProps (nextProps) {
    const wl = nextProps.wishlist || { count: 0, has_next_page: false, items: [], total_data: 0 }
    const wishlists = wl.items || []
    const newWishlists = wishlists.map(wl => Object.assign({}, wl, { isLoved: true }))

    this.props.replaceWishlists(newWishlists)
    this.setState({ query: nextProps.query })
  }

  render () {
    const wl = this.props.wishlist || { count: 0, has_next_page: false, items: [], total_data: 0 }
    const wishlists = this.props.wishlists || []
    const isNoWishlist = wishlists.length === 0 && !this.props.loading && this.props.query === ''
    const isEmptyResult = wishlists.length === 0 && !this.props.loading && this.props.query !== ''

    const searchTransitionOptions = {
      transitionName: 'searchTransition',
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnter: true,
      transitionEnterTimeout: 500,
      transitionLeave: true,
      transitionLeaveTimeout: 500
    }

    return (
      <div className='u-clearfix'>
        <div className='wishlist__searchbar-holder'>
          <i className='wishlist__icon wishlist__love-grey wishlist__set-love-grey' />
          <input
            type='search'
            name='searchwishlist'
            className='wishlist__searchbar'
            placeholder={lang[this.props.lang]['Search in Wishlist']}
            onChange={this.updateQuery}
            onKeyPress={this.searchWishlist}
            value={this.state.query} />
        </div>

        <ReactCSSTransitionGroup {...searchTransitionOptions}>
          {
              this.props.query !== '' &&
              <div id='search-stats'>
                <div className='u-col u-col-6 search-stats-detail'>
                  <p className='wishlist__search-result'>
                    { wl['total_data'] || wishlists.length } {lang[this.props.lang]['Hasil']}
                  </p>
                </div>
                <div className='u-col u-col-6 search-stats-detail'>
                  <span className='wishlist__reset-search' onClick={this.resetSearch}>
                    { lang[this.props.lang]['Clear'] }
                  </span>
                </div>
                <div className='u-clearfix' />
              </div>
            }
        </ReactCSSTransitionGroup>

        <div className='wishlist-container u-clearfix'>
          {isNoWishlist && <WishlistEmpty userID={this.props.userID} />}
          {isEmptyResult && <WishlistSearchEmpty userID={this.props.userID} />}
          {wishlists.length > 0 && ArrayHelper.chunk(wishlists, 2).map((wls, index) => {
            const key = `wishlist-cont-${index}`

            return (
              <div className='u-clearfix' key={key}>
                {this.renderWishlists(wls, index)}
              </div>
            )
          })}
        </div>

        {
          wl['has_next_page'] &&
          <LoadMore onClick={this.viewMore}>
            {lang[this.props.lang]['View More']}
          </LoadMore>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  replaceWishlists, updatePage, updateQuery
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    page: state['wishlist'] ? state['wishlist'].page : state.page,
    query: state['wishlist'] ? state['wishlist'].query : state.query,
    wishlists: state['wishlist'] ? state['wishlist'].wishlists : state.wishlists
  }
}

const WishListWithData = graphql(queries.WishlistQueries.getAll, {
  options: ({ userID, query, page }) => ({
    variables: { userID, query, page, count: WISHLIST_PER_PAGE },
    forceFetch: true,
    returnPartialData: true
  }),
  props: ({ data: { loading, wishlist, fetchMore, refetch } }) => {
    return {
      loading,
      wishlist,
      fetchMore: (newQuery = '', nextPage = 1) => {
        fetchMore({
          variables: { page: nextPage, query: newQuery, count: WISHLIST_PER_PAGE },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev }
            const newWL = fetchMoreResult.data.wishlist

            return Object.assign({}, prev, {
              wishlist: Object.assign({}, prev.wishlist, {
                count: newWL['count'],
                has_next_page: newWL['has_next_page'],
                total_data: newWL['total_data'],
                items: prev.wishlist.items.concat(newWL.items)
              })
            })
          }
        })
      },
      refetch
    }
  }
})(WishList)

export default connect(mapStateToProps, mapDispatchToProps)(WishListWithData)
