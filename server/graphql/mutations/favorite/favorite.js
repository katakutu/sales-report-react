const {
    GraphQLBoolean,
    GraphQLInt
} = require('graphql')
const { addFavorite, removeFavorite } = require('../../models/favorite')

const RemoveFavoriteMutation = {
  type: GraphQLBoolean,
  args: {
    productID: { type: GraphQLInt },
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return removeFavorite(args.userID, args.productID)
  }
}

const AddFavoriteMutation = {
  type: GraphQLBoolean,
  args: {
    productID: { type: GraphQLInt },
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return addFavorite(args.userID, args.productID)
  }
}

module.exports = {
  'favorite_add': { 'favorite_add': AddFavoriteMutation },
  'favorite_remove': { 'favorite_remove': RemoveFavoriteMutation }
}
