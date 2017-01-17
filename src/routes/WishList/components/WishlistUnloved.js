import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import { activateWishlist } from '../module'

import './WishListView.scss'

class WishlistUnloved extends Component {
  static propTypes = {
    activateWishlist: PropTypes.func,
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

    this.props.mutate(variables).then(addSuccess => {
      if (addSuccess) {
        this.props.activateWishlist(this.props.productID)
      }
    })
  }

  render () {
    return (
      <button className='wishlist__button-wish' onClick={this.handleClick}>
        <i className='wishlist__icon wishlist__love-empty' />
      </button>
    )
  }
}

const WishlistUnlovedQL = graphql(mutations.Wishlist.addWishlist)(WishlistUnloved)
const WishlistUnlovedQLR = connect(undefined, { activateWishlist })(WishlistUnlovedQL)

export default WishlistUnlovedQLR
