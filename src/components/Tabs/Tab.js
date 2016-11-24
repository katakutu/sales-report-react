import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'

class Tab extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
    label: React.PropTypes.node,
    onActive: React.PropTypes.func,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: '',
    disabled: false,
    hidden: false,
    isActive: false
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate (prevProps) {
        // when tab active
    if (!prevProps.isActive && this.props.isActive && this.props.onActive) {
      this.props.onActive()
    }
  }

  handleClick (event) {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render () {
    const { className, disabled, hidden, isActive, label, ...others } = this.props

    const _className = classnames(
            className,
      {
        'tab__active': isActive,
        'tab__disabled': disabled,
        'tab__hidden': hidden
      }
        )

    return (
      <label {...others} className={_className}
        onClick={this.handleClick}>
        {label}
      </label>
    )
  }
}

export default Tab
