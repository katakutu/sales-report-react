import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { actions } from '../../store/app'

import OnOffWrapper from '../../components/Events/OnOffWrapper'
import ToastNotification from '../../components/ToastNotification'

class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
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
          seqNo={index + 1}>
          {notification.text}
        </ToastNotification>
      )
    })
  }

  render () {
    let gs = this.props.isOnline ? 'grayscale(0%)' : 'grayscale(100%)'
    let ds = { height: '100%', filter: gs }

    return (
      <OnOffWrapper onOnline={this.handleOnOnline} onOffline={this.handleOnOffline}>
        <div style={ds}>
          <div className='content'>
            {this.props.children}
          </div>
          <Footer />

          {this.props.notifications.length > 0 ? this.renderNotifications() : null}
        </div>
      </OnOffWrapper>
    )
  }
}

const mapDispatchToProps = actions
const mapStateToProps = (state) => {
  return {
    isOnline: state['app'] ? state['app'].isOnline : state.isOnline,
    notifications: state['app'] ? state['app'].notifications : state.notifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
