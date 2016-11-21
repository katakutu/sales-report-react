/***
 * Service worker registration script
 */
'use strict'

if ('serviceWorker' in window.navigator &&
    (window.location.protocol === 'https' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname.indexOf('127.') === 0)) {
  var serviceWorkerContainer = window.navigator.serviceWorker
  var serviceWorkerScript = document.currentScript.dataset.serviceWorker

  var contentReady = event => {
    document.removeEventListener('DOMContentLoaded', contentReady)

    serviceWorkerContainer.ready.then(registration => {
      // Initialization logic here
      console.log('service worker ready.')
    })
  }

  document.addEventListener('DOMContentLoaded', contentReady)
  serviceWorkerContainer.register(serviceWorkerScript, { scope: './' })
        .then(registration => {
          // Post registration logic here
          console.log('service worker registered.')
        })
        .catch(e => {
          console.error('[sw] Error during service worker registration: ', e)
        })
}
