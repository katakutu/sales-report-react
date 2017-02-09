import React, { Component } from 'react'
import './Label.scss'

class Label extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    htmlFor: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: ''
  }

  render () {
    return (
      <label htmlFor={this.props.htmlFor} className='label'>
        {this.props.children}
      </label>
    )
  }
}

export default Label
