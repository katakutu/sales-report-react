/* global importScripts */
(global => {
  'use strict'

  importScripts('./sw-toolbox.js')

    // Skip events so ServiceWorkers can take control ASAP
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()))
  global.addEventListener('active', event => event.waitUntil(global.clients.claim()))

    // Routes and other codes (caching, intercepting, GraphQL integration, etc) here
})(self)
