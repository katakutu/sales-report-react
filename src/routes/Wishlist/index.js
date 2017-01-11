export default (store, ApolloExecutors) => ({
    path: '/user/wishlist',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Wishlist = require('./components/WishlistView').default

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