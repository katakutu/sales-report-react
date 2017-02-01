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
             isUserLoggedIn) {
            window.location = `/feed`
          }

          return callback()
        })
        .catch(err => callback(err))
    }
  }
}
