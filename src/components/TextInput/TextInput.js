import React, { Component } from 'react'
import './TextInput.scss'
import classNames from 'classnames'

class TextInput extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    className: '',
    id: '',
    name: ''
  }

  render () {
    return (
      <input type='text'
        id={this.props.id}
        name={this.props.name}
        className='text-input'
        placeholder={this.props.placeholder} 
        onChange={this.props.onChange}/>
    )
  }
}

export default TextInput
