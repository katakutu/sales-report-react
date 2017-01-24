const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { Favorites } = require('../../types/favorite')
const { getPromoted, getFavorited } = require('../../models/favorite')

const PromotedQuery = {
  type: Favorites,
  args: {},
  resolve: function (_, args, context) {
    return getPromoted(context)
  }
}

const FavoritedQuery = {
  type: Favorites,
  args: {
    user_id: { type: GraphQLInt },
    query: { type: GraphQLString },
    page: { type: GraphQLInt },
    count: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getFavorited(args.user_id, args.query, args.count, args.page)
  }
}

module.exports = {
  'promoted': { 'promoted': PromotedQuery },
  'favorites': { 'favorites': FavoritedQuery }
}
