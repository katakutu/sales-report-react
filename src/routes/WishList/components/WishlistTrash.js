import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import lang from '../../../lib/utils/Lang'
import { deactivateWishlist, replaceWishlists } from '../module'
import { notificationDispatch } from './../../../store/app'

import './WishListView.scss'

class WishlistTrash extends Component {
  static propTypes = {
    deactivateWishlist: PropTypes.func,
    replaceWishlists: PropTypes.func,
    lang: PropTypes.string,
    notificationDispatch: PropTypes.func,
    mutate: PropTypes.func.isRequired,
    productName: PropTypes.string,
    userID: PropTypes.number,
    onDeleted: PropTypes.func,
    wishlist: PropTypes.object
  }

  static defaultProps = {
    onDeleted: () => {}
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const productID = parseInt(this.props.wishlist['id'])
    const variables = {
      variables: {
        userID: this.props.userID,
        productID: productID
      }
    }

    const that = this
    this.props.mutate(variables).then(removeSuccess => {
      if (removeSuccess['data']['wishlist_remove'] || false) {
        const msg = lang[that.props.lang]['Remove Wishlist Success']

        this.props.deactivateWishlist(productID)
        this.props.onDeleted(productID)
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Wishlist',
          text: msg.replace(':item', that.props.productName),
          timeout: 3000
        })
      } else {
        const msg = lang[that.props.lang]['Remove Wishlist Failed']

        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Wishlist',
          text: msg.replace(':item', that.props.productName),
          timeout: 3000
        })
      }
    })
  }

  render () {
    return (
      <button
        disabled={!this.props.wishlist['isActive']}
        className='wishlist__button-trash'
        onClick={this.handleClick}>
        <i className='wishlist__icon wishlist__trash' />
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
const WishlistTrashQL = graphql(mutations.Wishlist.removeWishlist)(WishlistTrash)
const WishlistTrashQLR = connect(mapStateToProps, {
  deactivateWishlist, replaceWishlists, notificationDispatch
})(WishlistTrashQL)

export default WishlistTrashQLR
