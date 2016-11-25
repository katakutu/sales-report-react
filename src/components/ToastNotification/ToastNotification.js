import React, { Component } from 'react'
import classnames from 'classnames'
import './ToastNotification.scss'

class ToastNotification extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    timeout: React.PropTypes.number
  }

  constructor (props) {
    super(props)

    this.scheduleTimeout = this.scheduleTimeout.bind(this)
  }

  componentDidMount () {
    if (this.props.isActive && this.props.timeout) {
      this.scheduleTimeout(this.props)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isActive && this.props.timeout) {
      this.scheduleTimeout(nextProps)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.currentTimeout)
  }

  scheduleTimeout (props) {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }

    this.currentTimeout = setTimeout(() => {
      if (props.onTimeout) { props.onTimeout() }
      this.currentTimeout = null
    }, props.timeout)
  }

  render () {
    const className = classnames('toast__container', this.props.className)

    return (
      <div className={className} style={{ animation: `notif ${this.props.timeout}ms` }}>
        <div className='toast__text'>
          {this.props.label}

          <div className='toast__content'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default ToastNotification
