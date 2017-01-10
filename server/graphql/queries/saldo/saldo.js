const SaldoType = require('../../types/saldo')
const getSaldo = require('../../models/saldo')

const SaldoQuery = {
  type: SaldoType,
  args: {},
  resolve: function (_, args, context) {
    return getSaldo(context)
  }
}

module.exports = SaldoQuery
