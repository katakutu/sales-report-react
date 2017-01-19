const { Favorites } = require('../../types/favorite')
const { getFavorite } = require('../../models/favorite')

const FaveQuery = {
  type: Favorites,
  args: {},
  resolve: function (_, args, context) {
    return getFavorite(context)
  }
}

module.exports = FaveQuery
