import { injectReducer } from '../../store/reducers'

export default (store, ApolloExecutors) => ({
  path : '/feed',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Feed = require('./components/FeedView').default

      cb(null, Feed)
    }, 'feed')
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
