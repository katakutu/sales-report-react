import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import lang from '../../../lib/utils/Lang'
import { removeWishlist } from '../module'
import { notificationDispatch } from './../../../store/app'

import './WishListView.scss'

class WishlistTrash extends Component {
  static propTypes = {
    removeWishlist: PropTypes.func,
    lang: PropTypes.string,
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

    const that = this
    this.props.mutate(variables).then(removeSuccess => {
      if (removeSuccess['data']['wishlist_remove'] || false) {
        const msg = lang[that.props.lang]['Remove Wishlist Success']

        this.props.removeWishlist(that.props.productID)
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
      <button className='wishlist__button-trash' onClick={this.handleClick}>
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
  removeWishlist, notificationDispatch
})(WishlistTrashQL)

export default WishlistTrashQLR
