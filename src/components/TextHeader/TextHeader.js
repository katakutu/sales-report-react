import React, { Component } from 'react'
import './TextHeader.scss'

class TextHeader extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    textType: React.PropTypes.string
  }

  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.textType === 'h1') {
      return (
        <h1 className='text-header'>
          {this.props.children}
        </h1>
      )
    } else if (this.props.textType === 'h2') {
      return (
        <h2 className='text-header'>
          {this.props.children}
        </h2>
      )
    } else if (this.props.textType === 'h3') {
      return (
        <h3 className='text-header'>
          {this.props.children}
        </h3>
      )
    } else if (this.props.textType === 'h4') {
      return (
        <h4 className='text-header'>
          {this.props.children}
        </h4>
      )
    } else if (this.props.textType === 'h5') {
      return (
        <h5 className='text-header'>
          {this.props.children}
        </h5>
      )
    } else if (this.props.textType === 'h6') {
      return (
        <h6 className='text-header'>
          {this.props.children}
        </h6>
      )
    } else {
      return (
        <span className='text-header'>
          {this.props.children}
        </span>
      )
    }
  }
}

export default TextHeader
