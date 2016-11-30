import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomeOld from '../../components/HeaderHomeOld'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { notificationDismiss, notificationDispatch, updateConnectionStatus } from '../../store/app'

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

    let dummyInboxNotifs = {
      total: 9,
      inbox: {
        message: 0,
        product_discussion: 1,
        review: 1,
        customer_service: 2,
        resolution_center: 0
      },
      shopping: {
        cancelled: 0,
        confirmed: 1,
        order_status: 0,
        delivery_confirmation: 0,
        transaction_list: 1
      },
      seller: {
        new_order: 2,
        sent_confirmation: 1,
        delivery_status: 1,
        transaction_list: 0,
        product_list: 0,
        etalase: 0
      }
    }

    return (
      <OnOffWrapper onOnline={this.handleOnOnline} onOffline={this.handleOnOffline}>
        <div style={ds}>
          <HeaderHomeOld cartNotif={0} inboxNotifs={dummyInboxNotifs} />

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

const mapDispatchToProps = {
  notificationDismiss, notificationDispatch, updateConnectionStatus
}
const mapStateToProps = (state) => {
  return {
    isOnline: state['app'] ? state['app'].isOnline : state.isOnline,
    notifications: state['app'] ? state['app'].notifications : state.notifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
