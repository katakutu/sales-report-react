import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { notificationDismiss, notificationDispatch, updateConnectionStatus } from '../../store/app'

import OnOffWrapper from '../../components/Events/OnOffWrapper'
import ToastNotification from '../../components/ToastNotification'
import Spinner from '../../components/Loading/Spinner'

class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    isLoading: React.PropTypes.bool,
    isOnline: React.PropTypes.bool,
    notificationDismiss: React.PropTypes.func,
    notificationDispatch: React.PropTypes.func,
    notifications: React.PropTypes.arrayOf(React.PropTypes.object),
    updateConnectionStatus: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.handleOnOnline = this.handleOnOnline.bind(this)
    this.handleOnOffline = this.handleOnOffline.bind(this)
    this.renderNotifications = this.renderNotifications.bind(this)
  }

  componentWillMount () {
    this.props.updateConnectionStatus(navigator.onLine)
  }

  handleOnOffline (event) {
    this.props.updateConnectionStatus(navigator.onLine)
    this.props.notificationDispatch({
      id: (new Date().getTime()).toString(),
      active: true,
      label: 'Anda sedang offline',
      text: 'Mohon cek koneksi anda.',
      timeout: 3000
    })
  }

  handleOnOnline (event) {
    this.props.updateConnectionStatus(navigator.onLine)
  }

  renderNotifications () {
    return this.props.notifications.map((notification, index) => {
      let removeNotif = (id) => {
        return (event) => {
          this.props.notificationDismiss(id)
        }
      }

      return (
        <ToastNotification key={notification.id}
          label={notification.label}
          isActive={notification.active}
          timeout={notification.timeout}
          onClick={removeNotif(notification.id)}
          onTimeout={removeNotif(notification.id)}
          seqNo={index}>
          {notification.text}
        </ToastNotification>
      )
    })
  }

  render () {
    let ds = { height: '100%' }
    let finalDS = this.props.isOnline ? ds : Object.assign({}, ds, { filter: 'grayscale(100%)' })

    return (
      <OnOffWrapper onOnline={this.handleOnOnline} onOffline={this.handleOnOffline}>
        <div style={finalDS} className='layout u-flex u-flex-column'>
          { this.props.isLoading && <Spinner /> }

          <div className='content u-flex-auto'>
            {this.props.children}
          </div>

          <Footer />

          { this.props.notifications.length > 0 ? this.renderNotifications() : null }
        </div>
      </OnOffWrapper>
    )
  }
}

const mapDispatchToProps = {
  notificationDismiss, notificationDispatch, updateConnectionStatus
}
const mapStateToProps = (state) => {
  return {
    isLoading: state['app'] ? state['app'].isLoading : state.isLoading,
    isOnline: state['app'] ? state['app'].isOnline : state.isOnline,
    notifications: state['app'] ? state['app'].notifications : state.notifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
