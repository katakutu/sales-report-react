const wishlist = require('./wishlist')

let mutations = {}

mutations = Object.assign({}, mutations, wishlist.wishlist_add)
mutations = Object.assign({}, mutations, wishlist.wishlist_remove)

module.exports = mutations
