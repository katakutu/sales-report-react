import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import { deactivateWishlist } from '../module'
import { notificationDispatch } from './../../../store/app'

import './WishListView.scss'

class WishlistLove extends Component {
  static propTypes = {
    deactivateWishlist: PropTypes.func,
    notificationDispatch: PropTypes.func,
    mutate: PropTypes.func.isRequired,
    productID: PropTypes.number,
    productName: PropTypes.string,
    userID: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const variables = {
      variables: {
        userID: this.props.userID,
        productID: this.props.productID
      }
    }

    this.props.mutate(variables).then(removeSuccess => {
      if (removeSuccess['data']['wishlist_remove'] || false) {
        this.props.deactivateWishlist(this.props.productID)
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Wishlist',
          text: `Barang ${this.props.productName} berhasil dihapuskan dari wishlist`,
          timeout: 3000
        })
      } else {
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Wishlist',
          text: `Barang ${this.props.productName} gagal dihapuskan dari wishlist`,
          timeout: 3000
        })
      }
    })
  }

  render () {
    return (
      <button className='wishlist__button-wish' onClick={this.handleClick}>
        <i className='wishlist__icon wishlist__love-full' />
      </button>
    )
  }
}

const WishlistLoveQL = graphql(mutations.Wishlist.removeWishlist)(WishlistLove)
const WishlistLoveQLR = connect(undefined, {
  deactivateWishlist, notificationDispatch
})(WishlistLoveQL)

export default WishlistLoveQLR
