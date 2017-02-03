const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { Favorites } = require('../../types/favorite')
const { getPromoted, getFavorited } = require('../../models/favorite')

const FavoritedQuery = {
  type: Favorites,
  args: {
    user_id: { type: GraphQLInt },
    query: { type: GraphQLString },
    page: { type: GraphQLInt },
    count: { type: GraphQLInt },
    shop: { type: GraphQLString }
  },
  resolve: function (_, args, context) {
    return getFavorited(args.user_id, args.count, args.page, args.shop, context)
  }
}

module.exports = {
  favorite: FavoritedQuery 
}
