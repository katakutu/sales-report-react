import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'

class Tab extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
    url: React.PropTypes.string,
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
    const { className, disabled, hidden, isActive, url, label, ...others } = this.props

    const _className = classnames(
            className,
      {
        'tab__active': isActive,
        'tab__disabled': disabled,
        'tab__hidden': hidden
      }
        )

    let contentLabel
    if (url) {
      contentLabel = <a href={url}>{label}</a>
    } else {
      contentLabel = label
    }

    return (
      <label {...others} className={_className}
        onClick={this.handleClick}>
        {contentLabel}
      </label>
    )
  }
}

export default Tab
