import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import mutations from './../../../mutations'
import lang from '../../../lib/utils/Lang'
import { deactivateFavorite } from '../module'
import { notificationDispatch } from './../../../store/app'

import './FavoriteView.scss'

class Favorited extends Component {
  static propTypes = {
    deactivateFavorite: PropTypes.func,
    lang: PropTypes.string,
    notificationDispatch: PropTypes.func,
    mutate: PropTypes.func.isRequired,
    shopID: PropTypes.number,
    userID: PropTypes.number,
    nekot: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const variables = {
      variables: {
        userID: this.props.userID,
        shopID: this.props.shopID,
        token: this.props.nekot
      }
    }
    
    this.props.mutate(variables).then(removeSuccess => {
      if (removeSuccess['data']['favorite_remove'] || false) {
        const msg = lang[this.props.lang]['Remove Favorite Success']

        this.props.deactivateFavorite(this.props.shopID)
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Favorite',
          text: msg.replace(':item', this.props.shopName),
          timeout: 1500
        })
      } else {
        const msg = lang[this.props.lang]['Remove Favorite Failed']

        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: 'Favorite',
          text: msg.replace(':item', this.props.shopName),
          timeout: 1500
        })
      }
    })
  }

  render () {
    return (
      <a onClick={this.handleClick}>
        <i className='icon-checked' />&nbsp;&nbsp;&nbsp;{ lang[this.props.lang]['Favorited btn'] }
      </a>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
const FavoritedQL = graphql(mutations.Favorite.removeFavorite)(Favorited)
const FavoritedQLR = connect(mapStateToProps, {
  deactivateFavorite, notificationDispatch
})(FavoritedQL)

export default FavoritedQLR
