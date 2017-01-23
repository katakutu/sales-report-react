import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import lang from '../../../lib/utils/Lang'
import { activateWishlist } from '../module'
import { notificationDispatch } from './../../../store/app'

import './WishListView.scss'

class WishlistUnloved extends Component {
  static propTypes = {
    activateWishlist: PropTypes.func,
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

    this.props.mutate(variables).then(addSuccess => {
      if (addSuccess['data']['wishlist_add'] || false) {
        const msg = lang[this.props.lang]['Add Wishlist Success']

        this.props.activateWishlist(this.props.productID)
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Wishlist',
          text: msg.replace(':item', this.props.productName),
          timeout: 3000
        })
      } else {
        const msg = lang[this.props.lang]['Add Wishlist Failed']
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Wishlist',
          text: msg.replace(':item', this.props.productName),
          timeout: 3000
        })
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

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
const WishlistUnlovedQL = graphql(mutations.Wishlist.addWishlist)(WishlistUnloved)
const WishlistUnlovedQLR = connect(mapStateToProps, {
  activateWishlist, notificationDispatch
})(WishlistUnlovedQL)

export default WishlistUnlovedQLR
