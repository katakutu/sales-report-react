import HomeView from './components/HomeView'
import { HOSTNAME } from './../../constants'

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

          if (nextState.location.pathname === '/' &&
             !nextState.location.query.h &&
             !isUserLoggedIn) {
            replace(`/?h=3`)
          }

          return callback()
        })
        .catch(err => callback(err))
    }
  }
}
