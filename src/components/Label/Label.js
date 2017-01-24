import React, { Component } from 'react'
import './Label.scss'
import classNames from 'classnames'

class Label extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
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
