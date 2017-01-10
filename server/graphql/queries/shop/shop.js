const ShopType = require('../../types/shop')
const getShop = require('../../models/shop')

const ShopQuery = {
  type: ShopType,
  args: {},
  resolve: function (_, args, context) {
    return getShop(context)
  }
}

module.exports = ShopQuery
