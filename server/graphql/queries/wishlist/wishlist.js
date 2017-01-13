const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { WishlistsType } = require('../../types/wishlist')
const getUserWishlist = require('../../models/wishlist')

const userWishlistQuery = {
  type: WishlistsType,
  args: {
    user_id: { type: GraphQLInt },
    query: { type: GraphQLString },
    page: { type: GraphQLInt },
    count: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getUserWishlist(args.user_id, args.query, args.count, args.page)
  }
}

module.exports = userWishlistQuery
