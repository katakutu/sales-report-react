import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import OnOffWrapper from '../components/Events/OnOffWrapper'
import ToastNotification from '../components/ToastNotification'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.updateIsOnline = this.updateIsOnline.bind(this)
    this.dismissNotif = this.dismissNotif.bind(this)
  }

  state = {
    isOnline: navigator.onLine,
    notifLabel: '',
    notifText: '',
    showNotif: false
  }

  updateIsOnline (event) {
    this.setState({
      isOnline: navigator.onLine,
      notifLabel: navigator.onLine ? 'Anda telah online' : 'Anda sedang offline',
      notifText: navigator.onLine ? 'Selamat datang kembali!' : 'Mohon cek koneksi anda.',
      showNotif: true
    })
  }

  dismissNotif (event) {
    this.setState({ showNotif: false })
    console.log('A')
  }

  render () {
    const { routes, store } = this.props

    let gs = this.state.isOnline ? 'grayscale(0%)' : 'grayscale(100%)'
    let ds = { height: '100%', filter: gs }

    let toast = (
      <ToastNotification label={this.state.notifLabel}
        isActive={this.state.showNotif}
        timeout={4000}
        onClick={this.dismissNotif}
        onTimeout={this.dismissNotif}>
        {this.state.notifText}
      </ToastNotification>
    )

    return (
      <Provider store={store}>
        <OnOffWrapper onOnline={this.updateIsOnline} onOffline={this.updateIsOnline}>
          <div style={ds}>
            <Router history={browserHistory} children={routes} />

            { this.state.showNotif && toast }
          </div>
        </OnOffWrapper>
      </Provider>
    )
  }
}

export default AppContainer
