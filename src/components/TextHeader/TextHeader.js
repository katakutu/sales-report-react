import React, { Component } from 'react'
import './TextHeader.scss'

class TextHeader extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    textType: React.PropTypes.number,
    injectClassName: React.PropTypes.string
  }

  static defaultProps = {
    injectClassName: ''
  }

  render () {
    if (this.props.textType === 1) {
      return (
        <h1 className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </h1>
      )
    } else if (this.props.textType === 2) {
      return (
        <h2 className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </h2>
      )
    } else if (this.props.textType === 3) {
      return (
        <h3 className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </h3>
      )
    } else if (this.props.textType === 4) {
      return (
        <h4 className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </h4>
      )
    } else if (this.props.textType === 5) {
      return (
        <h5 className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </h5>
      )
    } else if (this.props.textType === 6) {
      return (
        <h6 className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </h6>
      )
    } else {
      return (
        <span className={'text-header ' + this.props.injectClassName}>
          {this.props.children}
        </span>
      )
    }
  }
}

export default TextHeader
