import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { GA_PROPERTY_ID } from '../constants'

ReactGA.initialize('UA-9801603-1');

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
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
