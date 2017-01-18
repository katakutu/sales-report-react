export default (store, ApolloExecutors) => ({
  path: '/fave',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Favorite = require('./components/FavoriteView').default

      cb(null, Favorite)
    }, 'fave')
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
