import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import 'whatwg-fetch'

class ImpressionTracker extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    url: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.sendImpression = this.sendImpression.bind(this)
  }

  state = {
    active: true
  }

  sendImpression (url) {
    fetch(url, { method: 'GET' })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            active: false
          })
        }
      })
  }

  onChange (isVisible) {
    if (isVisible) {
      this.sendImpression(this.props.url)
    }
  }

  render () {
    return (
      <VisibilitySensor
        onChange={this.onChange}
        partialVisibility='top'
        minTopValue={10}
        active={this.state.active} >
        { this.props.children }
      </VisibilitySensor>
    )
  }
}

export default ImpressionTracker
