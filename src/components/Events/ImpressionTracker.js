import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import 'whatwg-fetch'

class ImpressionTracker extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    url: React.PropTypes.string,
    urlMatch: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.sendImpression = this.sendImpression.bind(this)
  }

  state = {
    active: true
  }

  sendImpression (url, urlMatch) {
    if (url !== urlMatch) {
      fetch(`${url}&render=false`, { method: 'GET' })
        .then(response => {
          this.setState({
            active: false
          })
        })
    } else {
      this.setState({
        active: false
      })
    }
  }

  onChange (isVisible) {
    if (isVisible) {
      this.sendImpression(this.props.url, this.props.urlMatch)
    }
  }

  render () {
    return (
      <VisibilitySensor
        onChange={this.onChange}
        partialVisibility='top'
        minTopValue={200}
        active={this.state.active} >
        { this.props.children }
      </VisibilitySensor>
    )
  }
}

export default ImpressionTracker
