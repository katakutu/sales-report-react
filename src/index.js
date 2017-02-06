/* global $ */
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SITES } from 'constants'
import queries from './queries'
import Routes from './routes/index'

// ========================================================
// Initiate Wallet
//
// Globalfunction for GTM
// ========================================================
window.show_wallet_activation_button = function () {
  const accountsClientHost = SITES['Accounts']
  if (accountsClientHost) {
    let btn = []
    btn.push('<a href="' + accountsClientHost +
    '/wallet/activation?v=2"><span class="drawer__menu-icon icon__svg icon__tokocash" alt="tokopedia" />' +
    '<span class="drawer__menu-title u-inline-block">TokoCash</span>' +
    '<span id="tokocash-activate-btn" class="drawer__activate-tokoCash">' +
    'Activate TokoCash' + '</span>')
    $('#tokocash-balance-container').html(btn.join(''))
  }
}

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
const batchingNetworkInterface = createBatchingNetworkInterface({
  uri: '/graphql',
  batchInterval: 250,
  opts: {
    credentials: 'same-origin'
  }
})
const client = new ApolloClient({
  networkInterface: batchingNetworkInterface,
  queryDeduplication: true,
  shouldBatch: true
})

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
const ApolloExecutors = queries.ApolloExecutors(client)

let render = () => {
  const routes = Routes(store, ApolloExecutors)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer store={store} routes={routes} />
    </ApolloProvider>,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
