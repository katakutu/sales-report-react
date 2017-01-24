import React, { Component } from 'react'
import './Select.scss'
import classNames from 'classnames'

class Select extends Component {
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
      <select placeholder='Kemantapan' className='select'>
        {this.props.children}
      </select>
    )
  }
}

export default Select
