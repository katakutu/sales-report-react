import React, { Component } from 'react'
import './Select.scss'

class Select extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: ''
  }

  render () {
    return (
      <div>
        <select name='' id={this.props.id} className='u-hide'>
          {this.props.children}
        </select>
        <div className='select'>
          Rp 25.000
        </div>
      </div>
    )
  }
}

export default Select
