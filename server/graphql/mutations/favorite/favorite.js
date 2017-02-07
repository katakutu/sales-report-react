const {
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql')
const { addFavorite, removeFavorite } = require('../../models/favorite')

const RemoveFavoriteMutation = {
  type: GraphQLBoolean,
  args: {
    shopID: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    token: { type: GraphQLString },
    adKey: { type: GraphQLString }
  },
  resolve: function (_, args, context) {
    return removeFavorite(args.userID, args.shopID, args.token, context, args.adKey)
  }
}

const AddFavoriteMutation = {
  type: GraphQLBoolean,
  args: {
    shopID: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    token: { type: GraphQLString },
    adKey: { type: GraphQLString }
  },
  resolve: function (_, args, context) {
    return addFavorite(args.userID, args.shopID, args.token, context, args.adKey)
  }
}

module.exports = {
  'favorite_add': { 'favorite_add': AddFavoriteMutation },
  'favorite_remove': { 'favorite_remove': RemoveFavoriteMutation }
}
