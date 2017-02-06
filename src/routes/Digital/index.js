import { DURL } from './digitalconstants'

export const DDonasiRoute = (store) => ({
  path : DURL['donasi'],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Donasi = require('./components/DigitalView').default

      /*  Return getComponent   */
      cb(null, Donasi)

    /* Webpack named bundle   */
    }, 'donasi')
  }
})

export const DGameRoute = (store) => ({
  path : DURL['game'],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Game = require('./components/DigitalView').default

      /*  Return getComponent   */
      cb(null, Game)

    /* Webpack named bundle   */
    }, 'game')
  }
})
