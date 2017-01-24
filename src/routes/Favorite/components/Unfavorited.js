import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import lang from '../../../lib/utils/Lang'
import { activateFavorite } from '../module'
import { notificationDispatch } from './../../../store/app'

import './FavoriteView.scss'

class Unfavorited extends Component {
  static propTypes = {
    activateFavorite: PropTypes.func,
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
      if (addSuccess['data']['favorite_add'] || false) {
        const msg = lang[this.props.lang]['Add Favorite Success']

        this.props.activateFavorite(this.props.productID)
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Favorite',
          text: msg.replace(':item', this.props.productName),
          timeout: 3000
        })
      } else {
        const msg = lang[this.props.lang]['Add Favorite Failed']
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Favorite',
          text: msg.replace(':item', this.props.productName),
          timeout: 3000
        })
      }
    })
  }

  render () {
    return (
      <a href='#' onClick={this.handleClick}>
        <i className='icon-checked'></i>&nbsp;&nbsp;&nbsp;{ lang[this.props.lang]['Favorited btn'] }
      </a>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
const UnfavoritedQL = graphql(mutations.Favorite.addFavorite)(Unfavorited)
const UnfavoritedQLR = connect(mapStateToProps, {
  activateFavorite, notificationDispatch
})(UnfavoritedQL)

export default UnfavoritedQLR
