const {
    TopedWalletAPI,
    DEFAULT_WALLET_DATA
} = require('./../../api-consumer/api/Wallet/TopedWalletAPI')
const GlobalConfig = require('./../../GlobalConfig')
const api = new TopedWalletAPI()

function getWallet (context) {
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'

  return api.getWalletBalance(
        context.read('Origin') || GlobalConfig['Hostname'],
        sessID
    )
    .catch(error => {
      console.error(`[GraphQL][Models][Wallet] Error getting wallet data: ${error}`)

      return Promise.resolve(DEFAULT_WALLET_DATA)
    })
}

module.exports = getWallet
