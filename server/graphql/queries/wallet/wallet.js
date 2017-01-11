const WalletType = require('../../types/wallet')
const getWallet = require('../../models/wallet')

const WalletQuery = {
  type: WalletType,
  args: {},
  resolve: function (_, args, context) {
    return getWallet(context)
  }
}

module.exports = WalletQuery
