import React, { Component } from 'react'

class OnOffWrapper extends Component {
  static propTypes = {
    onOffline: React.PropTypes.func,
    onOnline: React.PropTypes.func,
    children: React.PropTypes.node
  }

  constructor (props) {
    super(props)

    this.handleOffline = this.handleOffline.bind(this)
    this.handleOnline = this.handleOnline.bind(this)
  }

  handleOffline (event) {
    if (this.props.onOffline) {
      this.props.onOffline(event)
    }
  }

  handleOnline (event) {
    if (this.props.onOnline) {
      this.props.onOnline(event)
    }
  }

  render () {
    return this.props.children
  }

  componentDidMount () {
    if (this.props.onOffline) {
      window.addEventListener('offline', this.handleOffline)
    }

    if (this.props.onOnline) {
      window.addEventListener('online', this.handleOnline)
    }
  }

  componentWillUnmount () {
    if (this.props.onOffline && window.removeEventListener) {
      window.removeEventListener('offline', this.handleOffline)
    }

    if (this.props.onOnline && window.removeEventListener) {
      window.removeEventListener('online', this.handleOnline)
    }
  }
}

export default OnOffWrapper
