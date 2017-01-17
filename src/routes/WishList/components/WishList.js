import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import { HOSTNAME } from './../../../constants'
import queries from './../../../queries'

import {
  addWishlist,
  clearWishlists,
  replaceWishlists
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
    page: PropTypes.number,
    query: PropTypes.string,
    replaceWishlists: PropTypes.func,
    userID: PropTypes.number,
    wishlists: PropTypes.arrayOf(PropTypes.object)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps['data'] && !nextProps.data.loading) {
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
    }
  }

  render () {
    if (this.props.data.loading) {
      return null
    }

    const wishlists = this.props.wishlists

    return (
      <div className='wishlist-container u-clearfix'>
        { wishlists.length === 0 && <WishlistEmpty /> }
        { wishlists.length > 0 && wishlists.map((wishlist, index) => {
          const currentPage = window.location.href
          const mainLink = `${HOSTNAME}/add-to-cart.pl`
          const buyLink = `${mainLink}?refback=${currentPage}&id=${wishlist['id']}&referer=${currentPage}`

          const labels = wishlist['labels'] || []
          const badges = wishlist['badges'] || []

          return (
            <div className='u-col u-col-6 wishlist__contents' key={`wishlist-${index}`}>
              <div className='wishlist__content-box'>
                {
                  wishlist['isActive']
                    ? <WishlistLove userID={this.props.userID} productID={parseInt(wishlist['id'])} />
                    : <WishlistUnloved userID={this.props.userID} productID={parseInt(wishlist['id'])} />
                }
                <a href={wishlist['url']}>
                  <img src={wishlist['image']} className='wishlist__img' alt='tokopedia' />
                  <div className='wishlist__title'>{ wishlist['name'] }</div>
                </a>
                <div className='wishlist__price u-truncate'>{ wishlist['price_formatted'] }</div>
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
                            { label['title'] }
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
                  <div className='wishlist__shop-name u-truncate'>{ wishlist['shop']['name'] }</div>
                </a>
                <div className='wishlist__shop-loc-badge'>
                  <span className='wishlist__shop-location u-truncate'>
                    <i className='icon-location' /> { wishlist['shop']['location'] }
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
                  <a href={buyLink} className='wishlist__button-buy'>Beli</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = { addWishlist, clearWishlists, replaceWishlists }
const mapStateToProps = (state) => {
  return {
    wishlists: state['wishlist'] ? state['wishlist'].wishlists : state.wishlists
  }
}

export default graphql(queries.WishlistQueries.getAll, {
  options: ({ userID, query, count, page }) => ({
    variables: { userID, query, count, page }
  })
}
)(connect(mapStateToProps, mapDispatchToProps)(WishList))
