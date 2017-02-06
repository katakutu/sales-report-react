import React, { Component } from 'react'
import './Checkbox.scss'

class Checkbox extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: '',
    id: '',
    name: ''
  }

  render () {
    return (
      <div>
        <input type='checkbox' id={this.props.id} 
        className='checkbox' onClick={this.props.onClick} 
        name={this.props.name} 
        value='1'/>
        <label htmlFor='instant' className='checkbox__label'>
          {this.props.children}
        </label>
      </div>
    )
  }
}

export default Checkbox
