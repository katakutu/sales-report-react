import React, { Component } from 'react'
import './Checkbox.scss'

class Checkbox extends Component {
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
      <div>
        <input type='checkbox' id='instant' className='checkbox' />
        <label htmlFor='instant' className='checkbox__label'>
          {this.props.children}
        </label>
      </div>
    )
  }
}

export default Checkbox
