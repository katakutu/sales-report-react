const { RechargeCategoriesType } = require('../../../types/recharge_category')
const { getCategoryList } = require('../../../models/recharge')

const RechargeCategoryQuery = {
  type: RechargeCategoriesType,
  args: { },
  resolve: function (_, args) {
    return getCategoryList()
  }
}

module.exports = RechargeCategoryQuery
