import React, { Component } from 'react'
import classnames from 'classnames'
import './ToastNotification.scss'

const BOT_HEIGHT = 0 // bottom navigation height

class ToastNotification extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    seqNo: React.PropTypes.number,
    timeout: React.PropTypes.number
  }

  static defaultProps = {
    seqNo: 1,
    timeout: 2000
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
    if (this.currentTimeout) { clearTimeout(this.currentTimeout) }

    this.currentTimeout = setTimeout(() => {
      if (props.onTimeout) { props.onTimeout() }
      this.currentTimeout = null
    }, props.timeout * 2)
  }

  render () {
    const className = classnames('toast__container', this.props.className)
    const finalStyle = {
      animation: `notif ${this.props.timeout}ms`,
      bottom: `${this.props.seqNo * BOT_HEIGHT}px`,
      transition: `bottom ${this.props.timeout / 2}ms ease-in-out`
    }

    return (
      <div className={className} style={finalStyle}>
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
