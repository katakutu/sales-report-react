import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { GA_PROPERTY_ID, GTM_CONTAINER_ID } from '../constants'
import GoogleTagManager from '../components/GoogleTagManager'

ReactGA.initialize(GA_PROPERTY_ID)

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  logPageView () {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }

  componentDidMount () {
    let splashScreen = document.getElementById('splash-screen')
    if (splashScreen) splashScreen.remove()
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div>
          <GoogleTagManager gtmID={GTM_CONTAINER_ID} />
          <Router history={browserHistory} children={routes} onUpdate={this.logPageView} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
