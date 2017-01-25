const wishlist = require('./wishlist')
const favorite = require('./favorite')

let mutations = {}

mutations = Object.assign({}, mutations, wishlist.wishlist_add)
mutations = Object.assign({}, mutations, wishlist.wishlist_remove)
mutations = Object.assign({}, mutations, favorite.favorite_add)
mutations = Object.assign({}, mutations, favorite.favorite_remove)

module.exports = mutations
