import { injectReducer } from '../../store/reducers'

export default (store, ApolloExecutors) => ({
  path: '/wishlist',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Wishlist = require('./components/WishListView').default
      const reducer  = require('./module').default

      injectReducer(store, { key: 'wishlist', reducer })

      cb(null, Wishlist)
    }, 'wishlist')
  },
  onEnter (nextState, replace, callback) {
    return ApolloExecutors.isUserLoggedIn()
          .then(isUserLoggedIn => {
            if (isUserLoggedIn) {
              return callback()
            }

            replace(`/?h=3`)
            return callback()
          })
        .catch(err => callback(err))
  }
})
