import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import OnOffWrapper from '../components/Events/OnOffWrapper'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.updateIsOnline = this.updateIsOnline.bind(this)
  }

  state = {
    isOnline: navigator.onLine
  }

  updateIsOnline (event) {
    this.setState({ isOnline: navigator.onLine })
  }

  render () {
    const { routes, store } = this.props
    console.log('render')

    let gs = this.state.isOnline ? 'grayscale(0%)' : 'grayscale(100%)'
    let ds = { height: '100%', filter: gs }

    return (
      <Provider store={store}>
        <OnOffWrapper onOnline={this.updateIsOnline} onOffline={this.updateIsOnline}>
          <div style={ds}>
            <Router history={browserHistory} children={routes} />
          </div>
        </OnOffWrapper>
      </Provider>
    )
  }
}

export default AppContainer
