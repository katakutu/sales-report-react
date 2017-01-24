import React, { Component } from 'react'
import './TextInput.scss'
import classNames from 'classnames'

class TextInput extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: '',
    id: ''
  }

  render () {
    return (
      <input type='text'
        id={this.props.id}
        className='text-input'
        placeholder={this.props.placeholder} />
    )
  }
}

export default TextInput
