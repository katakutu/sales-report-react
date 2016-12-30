/* global $ */
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import Promise from 'promise-polyfill'

import { SITES } from 'constants'

// ========================================================
// Promise Polyfill
// ========================================================
if (!window.Promise) {
  window.Promise = Promise
}

// ========================================================
// Array.findIndex Polyfill
// This polyfill is needed specifically for Apollo support
// in older browser (UC, Android Old Browser).
//
// The ESLint Disable Line is also because of this.
//
// Taken from MDN
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
// ========================================================
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', { // eslint-disable-line no-extend-native
    value: function (predicate) {
      'use strict'
      if (this == null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var list = Object(this)
      var length = list.length >>> 0
      var thisArg = arguments[1]
      var value

      for (var i = 0; i < length; i++) {
        value = list[i]
        if (predicate.call(thisArg, value, i, list)) {
          return i
        }
      }
      return -1
    },
    enumerable: false,
    configurable: false,
    writable: false
  })
}

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
    '/wallet/activation?v=2" class="topcash-btn display-block"><strong class="fs-11 ellipsis">' +
    'Activate TokoCash' +
    '</strong><span class="white ellipsis pull-right display-block"></span></a>')
    btn.push('<hr class="mt-5 mb-5">')
    $('#tokocash-balance-container').html(btn.join(''))
  }
}

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})
const client = new ApolloClient({ networkInterface })

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer store={store} routes={routes} />
    </ApolloProvider>,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
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
