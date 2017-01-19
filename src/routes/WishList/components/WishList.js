import React, { Component, PropTypes } from 'react'
import deepEqual from 'deep-equal'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Scroll from 'react-scroll'

import { HOSTNAME } from './../../../constants'
import queries from './../../../queries'
import lang from '../../../lib/utils/Lang'
import ArrayHelper from '../../../lib/utils/ArrayHelper'

import {
  addWishlist,
  clearWishlists,
  replaceWishlists,
  updateTotalWishlist
} from '../module'

import WishlistEmpty from './WishlistEmpty'
import WishlistLove from './WishlistLove'
import WishlistUnloved from './WishlistUnloved'

import './WishListView.scss'

class WishList extends Component {
  static propTypes = {
    addWishlist: PropTypes.func,
    clearWishlists: PropTypes.func,
    count: PropTypes.number,
    data: PropTypes.object,
    lang: PropTypes.string,
    page: PropTypes.number,
    query: PropTypes.string,
    replaceWishlists: PropTypes.func,
    scrollPosition: React.PropTypes.number,
    shouldRefetch: PropTypes.bool,
    updateTotalWishlist: PropTypes.func,
    userID: PropTypes.number,
    wishlists: PropTypes.arrayOf(PropTypes.object)
  }

  componentWillReceiveProps (nextProps) {
    // comparing only the relevant changes
    const np = {
      count: nextProps.count,
      page: nextProps.page,
      query: nextProps.query,
      wishlists: nextProps.wishlists
    }
    const tp = {
      count: this.props.count,
      page: this.props.page,
      query: this.props.query,
      wishlists: this.props.wishlists
    }
    const propsChanged = deepEqual(np, tp)

    if (nextProps['data'] && !nextProps.data.loading && propsChanged) {
      const ids = this.props.wishlists.map(w => w['id'])
      const data = nextProps['data']['wishlist'] && nextProps['data']['wishlist']['items']
      const gqlData = data || []

      const newData = gqlData.filter(d => !ids.includes(d['id']))
      if (nextProps.query === '' && newData.length > 0) {
        // if returning from search
        if (this.props.query !== '') {
          this.props.clearWishlists()
        }

        this.props.addWishlist(newData)
      } else if (nextProps.query !== '') {
        this.props.replaceWishlists(gqlData)
      }

      const totalData = nextProps['data']['wishlist'] && nextProps['data']['wishlist']['total_data']
      this.props.updateTotalWishlist(totalData || 0)
    }
  }

  renderWishlists (wishlists, parentIndex) {
    return wishlists.map((wishlist, index) => {
      const currentPage = window.location.href
      const mainLink = `${HOSTNAME}/add-to-cart.pl`
      const buyLink = `${mainLink}?refback=${currentPage}&id=${wishlist['id']}&referer=${currentPage}`

      const labels = wishlist['labels'] || []
      const badges = wishlist['badges'] || []

      return (
        <div className='u-col u-col-6 wishlist__contents' key={`wishlist-${parentIndex}-${index}`}>
          <div className='wishlist__content-box'>
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
            <a href={wishlist['url']}>
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
            </div>
            <div className='wishlist__buy'>
              <a href={buyLink} className='wishlist__button-buy'>
                {lang[this.props.lang]['Buy']}
              </a>
            </div>
          </div>
        </div>

      )
    })
  }

  render () {
    const wishlists = this.props.wishlists

    Scroll.animateScroll.scrollTo(this.props.scrollPosition, {
      duration: 0,
      delay: 0,
      smooth: false
    })

    return (
      <div className='wishlist-container u-clearfix'>
        { wishlists.length === 0 && !this.data.loading && <WishlistEmpty /> }
        { wishlists.length > 0 && ArrayHelper.chunk(wishlists, 2).map((wls, index) => {
          const key = `wishlist-cont-${index}`

          return (
            <div className='u-clearfix' key={key}>
              { this.renderWishlists(wls, index) }
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = { addWishlist, clearWishlists, replaceWishlists, updateTotalWishlist }
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    scrollPosition: state['wishlist'] ? state['wishlist'].scrollPosition : state.scrollPosition,
    wishlists: state['wishlist'] ? state['wishlist'].wishlists : state.wishlists
  }
}

export default graphql(queries.WishlistQueries.getAll, {
  options: ({ userID, query, count, page }) => ({
    variables: { userID, query, count, page },
    forceFetch: true,
    returnPartialData: true
  })
}
)(connect(mapStateToProps, mapDispatchToProps)(WishList))
