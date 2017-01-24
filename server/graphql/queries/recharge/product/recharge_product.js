const { RechargeProductsType } = require('../../../types/recharge_product')
const { getProductList } = require('../../../models/recharge')

const RechargeProductQuery = {
  type: RechargeProductsType,
  args: { },
  resolve: function (_, args) {
    return getProductList()
  }
}

module.exports = RechargeProductQuery
