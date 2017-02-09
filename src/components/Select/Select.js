import React, { Component } from 'react'
import './Select.scss'
import classNames from 'classnames'

class Select extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    title: React.PropTypes.string,
    errorMessage: React.PropTypes.string
  }

  static defaultProps = {
    className: '',
    errorMessage: ''
  }

  render () {
    let productDesc = this.props.title ? this.props.title : 'Pilih'
    return (
      <div>
        <select name='' id={this.props.id} className='u-hide'>
          {this.props.children}
        </select>
        <div className='select' onClick={this.props.onClick}>
          {productDesc}
        </div>
        <div className={classNames('error-message',
            { 'is-error' :  this.props.errorMessage !== '' },
            { 'u-hide' : this.props.errorMessage === '' })}>
          {this.props.errorMessage}
        </div>
      </div>
    )
  }
}

export default Select
