const {
    GraphQLBoolean,
    GraphQLInt
} = require('graphql')
const { removeWishlist } = require('../../models/wishlist')

const WishlistMutation = {
  type: GraphQLBoolean,
  args: {
    productID: { type: GraphQLInt },
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return removeWishlist(args.userID, args.productID)
  }
}

module.exports = WishlistMutation
