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
  args: {},
  resolve: function (_, args, context) {
    return getFavorited(context)
  }
}

module.exports = {
  'promoted': { 'promoted': PromotedQuery },
  'favorited': { 'favorited': FavoritedQuery }
}
