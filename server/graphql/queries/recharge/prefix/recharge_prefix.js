const { RechargePrefixsType } = require('../../../types/recharge_prefix')
const { getPrefixList } = require('../../../models/recharge')

const RechargePrefixQuery = {
  type: RechargePrefixsType,
  args: { },
  resolve: function (_, args) {
    return getPrefixList()
  }
}

module.exports = RechargePrefixQuery
