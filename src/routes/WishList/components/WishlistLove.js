import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import { deactivateWishlist } from '../module'

import './WishListView.scss'

class WishlistLove extends Component {
  static propTypes = {
    deactivateWishlist: PropTypes.func,
    mutate: PropTypes.func.isRequired,
    productID: PropTypes.number,
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
      if (removeSuccess) {
        this.props.deactivateWishlist(this.props.productID)
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
const WishlistLoveQLR = connect(undefined, { deactivateWishlist })(WishlistLoveQL)

export default WishlistLoveQLR