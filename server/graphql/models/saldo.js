const {
    TopedSaldoAPI,
    DEFAULT_SALDO_DATA
} = require('./../../api-consumer/api/Saldo/TopedSaldoAPI')
const common = require('./common')

function getSaldo (context) {
  const userID = common.getUserID(context)
  const api = new TopedSaldoAPI()

  return userID
        .then(uid => {
          return api.getDeposit(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Saldo] Error getting saldo data: ${error}`)

          return Promise.resolve(DEFAULT_SALDO_DATA)
        })
}

module.exports = getSaldo
