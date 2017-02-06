import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import GA from '../lib/utils/GA'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount () {
    let splashScreen = document.getElementById('splash-screen')
    if (splashScreen) splashScreen.parentNode.removeChild(splashScreen)
  }

  logPageView () {
    const path = (location.pathname+location.search).substr(1)
    GA.setPageView(`/${path}`)
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} children={routes} onUpdate={this.logPageView} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
