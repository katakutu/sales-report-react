const { RechargeOperatorsType } = require('../../../types/recharge_operator')
const { getOperatorList } = require('../../../models/recharge')

const RechargeOperatorQuery = {
  type: RechargeOperatorsType,
  args: { },
  resolve: function (_, args) {
    return getOperatorList()
  }
}

module.exports = RechargeOperatorQuery
