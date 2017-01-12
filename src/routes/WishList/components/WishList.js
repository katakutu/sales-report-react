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

          const labels = wishlist['labels'] || []
          const badges = wishlist['badges'] || []

          return (
            <div className='u-col u-col-6 wishlist__contents' key={`wishlist-${index}`}>
              <div className='wishlist__content-box'>
                <button className='wishlist__button-wish'><i className='wishlist__icon wishlist__love-full' /></button>
                <a href={wishlist['url']}>
                  <img src={wishlist['image']} className='wishlist__img' alt='tokopedia' />
                  <div className='wishlist__title'>{ wishlist['name'] }</div>
                </a>
                <div className='wishlist__price u-truncate'>{ wishlist['price_formatted'] }</div>
                <div className='wishlist__rating u-truncate'>
                  <span className='wishlist__rating-star star_3' />
                  <span className='wishlist__count-rating'>(14282989)</span>
                </div>
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
      badges{
        title
        image_url
      }
      labels{
        title
        color
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
