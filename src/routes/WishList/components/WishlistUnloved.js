import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import lang from '../../../lib/utils/Lang'
import { activateWishlist, updateScrollPosition } from '../module'
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
    updateScrollPosition: PropTypes.func,
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

    const sp = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop

    this.props.updateScrollPosition(sp)
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
  activateWishlist, notificationDispatch, updateScrollPosition
})(WishlistUnlovedQL)

export default WishlistUnlovedQLR
