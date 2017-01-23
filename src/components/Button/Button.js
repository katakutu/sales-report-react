import React, { Component } from 'react'
import './Button.scss'
import classNames from 'classnames'

class Button extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    buttonType: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: ''
  }

  render () {
    switch (this.props.buttonType) {
      case 'link':
        return (
          <a className={classNames('btn', this.props.className)} onClick={this.props.onClick}>
            {this.props.children}
          </a>
        )
      default:
        return (
          <button className={classNames('btn', this.props.className)}
            onClick={this.props.onClick}
            type={this.props.buttonType}>
            {this.props.children}
          </button>
        )
    }
  }
}

export default Button
