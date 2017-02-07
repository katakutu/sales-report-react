import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import lang from '../../lib/utils/Lang'
import { notificationDispatch } from '../../store/app'

class ShopButton extends Component {
  static propTypes = {
    lang: PropTypes.string,
    notificationDispatch: PropTypes.func,
    actionButton: PropTypes.func,
    mutate: PropTypes.func.isRequired,
    shopID: PropTypes.number,
    shopName: PropTypes.string,
    userID: PropTypes.number,
    token: PropTypes.string,
    productdName: PropTypes.string,
    src: PropTypes.string,
    activeAction: PropTypes.func,
    active: PropTypes.bool
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    console.log(this.props.token)
    const variables = {
      variables: {
        userID: this.props.userID,
        shopID: this.props.shopID,
        token: this.props.token
      }
    }
    this.props.mutate(variables).then(addSuccess => {
      if (addSuccess['data']['favorite_add'] || false) {
        const msg = lang[this.props.lang]['Add Favorite Success']

        this.props.activeAction(this.props.shopID)
        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: this.props.src,
          text: msg.replace(':item', this.props.shopName),
          timeout: 1500
        })
      } else {
        const msg = lang[this.props.lang]['Add Favorite Failed']

        this.props.notificationDispatch({
          id: (new Date().getTime()).toString(),
          active: true,
          label: this.props.src,
          text: msg.replace(':item', this.props.shopName),
          timeout: 1500
        })
      }
    })
  }

  render () {
    const active = this.props.active
    const label = active ? lang[this.props.lang]['Favorited btn']
    : lang[this.props.lang]['Unfavorited btn']
    const labelCN = active ? 'topads__shop__favorite-btn small' : 'topads__shop__favorite-btn small green'
    const labelIconCN = active ? 'icon-check' : 'icon-plus'
    return (
      <a className={labelCN} onClick={this.handleClick}>
        <i className={labelIconCN} />{ label }
      </a>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default function (mutation) {
  const ol = graphql(mutation)(ShopButton)

  return connect(mapStateToProps, { notificationDispatch })(ol)
}
