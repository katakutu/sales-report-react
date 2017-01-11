import React from 'react'
import './WishListView.scss'

import { HOSTNAME } from './../../../constants'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const WishList = (props) => {
  if (props.data.loading) {
    return null
  }

  const wishlists = props['data']['wishlist']
  const wishlistCount = wishlists['total_data']

  return (
    <div className='u-clearfix'>
      <div className='wishlist__searchbar-holder'>
        <i className='wishlist__icon wishlist__love-grey wishlist__set-love-grey' />
        <input type='text' name='searchwishlist' className='wishlist__searchbar' placeholder='Cari wishlist kamu' />
        <span className='wishlist__count-item'>{wishlistCount} item</span>
      </div>
      <div className='wishlist-container u-clearfix'>
        { wishlists['items'].map((wishlist, index) => {
          const currentPage = window.location.href
          const mainLink = `${HOSTNAME}/add-to-cart.pl`
          const buyLink = `${mainLink}?refback=${currentPage}&id=${wishlist['id']}&referer=${currentPage}`

          return (
            <div className='u-col u-col-6 wishlist__contents' key={`wishlist-${index}`}>
              <div className='wishlist__content-box'>
                <button className='wishlist__button-wish'><i className='wishlist__icon wishlist__love-full' /></button>
                <a href='#'>
                  <img src={wishlist['image']} className='wishlist__img' alt='tokopedia' />
                  <div className='wishlist__title'>{ wishlist['name'] }</div>
                </a>
                <div className='wishlist__price u-truncate'>{ wishlist['price_formatted'] }</div>
                <div className='wishlist__rating u-truncate'>
                  <span className='wishlist__rating-star star_3' />
                  <span className='wishlist__count-rating'>(14282989)</span>
                </div>
                <div className='wishlist__type-marketing u-truncate'>
                  <span className='wishlist__cashback'>Cashback 5%</span>
                </div>
                <a href={wishlist['shop']['url']}>
                  <div className='wishlist__shop-name u-truncate'>{ wishlist['shop']['name'] }</div>
                </a>
                <div className='wishlist__shop-loc-badge'>
                  <span className='wishlist__shop-location u-truncate'>
                    <i className='icon-location' /> { wishlist['shop']['location'] }
                  </span>
                  <span className='wishlist__badges'>
                    <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                    <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                    <img className='wishlist__img-badge' src='http://placehold.it/12x12' />
                  </span>
                </div>
                <div className='wishlist__buy'>
                  <a href={buyLink} className='wishlist__button-buy'>Beli</a>
                </div>
              </div>
            </div>
          )
        }) }
      </div>
    </div>
  )
}

WishList.propTypes = {
  count: React.PropTypes.number,
  data: React.PropTypes.object,
  page: React.PropTypes.number,
  userID: React.PropTypes.number
}

const WishlistQuery = gql`
query Query($userID: Int!, $count: Int!, $page: Int!) {
  wishlist(user_id:$userID, count: $count, page: $page){
    total_data
    items{
      id
      name
      url
      image
      price
      price_formatted
      minimum_order
      condition
      shop{
        id
        name
        url
        reputation{
          score
          set
          level
          image
        }
        official_store
        gold_merchant
        location
        status
      }
      available
      status
    }
  }
}
`

export default graphql(WishlistQuery, {
  options: ({ userID, count, page }) => ({
    variables: { userID, count, page },
    returnPartialData: true
  })
})(WishList)
