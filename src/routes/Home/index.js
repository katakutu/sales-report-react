import HomeView from './components/HomeView'

// Sync route definition
export default (store, ApolloExecutors) => {
  return {
    component: HomeView,
    onEnter: (nextState, replace, callback) => {
      return ApolloExecutors.isUserLoggedIn()
        .then(isUserLoggedIn => {
          if (nextState.location.pathname === '/' &&
             !nextState.location.query.h &&
             nextState.location.query.view !== 'feed_preview' &&
             isUserLoggedIn) {
            window.location = `/?view=feed_preview`
          }

          return callback()
        })
        .catch(err => callback(err))
    }
  }
}
