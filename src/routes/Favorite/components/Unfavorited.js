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
    shopID: PropTypes.number,
    shopName: PropTypes.string,
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

    this.props.mutate(variables).then(addSuccess => {
      console.log("----------------------")
      console.log(addSuccess)

      if (addSuccess['data']['favorite_remove'] || false) {
        const msg = lang[this.props.lang]['Remove Favorite Success']

        this.props.activateFavorite(this.props.shopID)
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
const UnfavoritedQL = graphql(mutations.Favorite.removeFavorite)(Unfavorited)
const UnfavoritedQLR = connect(mapStateToProps, {
  activateFavorite, notificationDispatch
})(UnfavoritedQL)

export default UnfavoritedQLR
