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
    token: { type: GraphQLString }
  },
  resolve: function (_, args) {
    return removeFavorite(args.userID, args.shopID, args.token)
  }
}

const AddFavoriteMutation = {
  type: GraphQLBoolean,
  args: {
    shopID: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    token: { type: GraphQLString }
  },
  resolve: function (_, args) {
    return addFavorite(args.userID, args.shopID, args.token)
  }
}

module.exports = {
  'favorite_add': { 'favorite_add': AddFavoriteMutation },
  'favorite_remove': { 'favorite_remove': RemoveFavoriteMutation }
}
