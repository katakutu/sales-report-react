const {
    GraphQLBoolean,
    GraphQLInt
} = require('graphql')
const { addWishlist, removeWishlist } = require('../../models/wishlist')

const RemoveWishlistMutation = {
  type: GraphQLBoolean,
  args: {
    productID: { type: GraphQLInt },
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return removeWishlist(args.userID, args.productID)
  }
}

const AddWishlistMutation = {
  type: GraphQLBoolean,
  args: {
    productID: { type: GraphQLInt },
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return addWishlist(args.userID, args.productID)
  }
}

module.exports = {
  'wishlist_add': { 'wishlist_add': AddWishlistMutation },
  'wishlist_remove': { 'wishlist_remove': RemoveWishlistMutation }
}
