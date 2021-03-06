const {
    TopedSaldoAPI,
    DEFAULT_SALDO_DATA
} = require('./../../api-consumer/api/Saldo/TopedSaldoAPI')
const common = require('./common')
const api = new TopedSaldoAPI()

function getSaldo (context) {
  const userID = common.getUserID(context)

  return userID
        .then(uid => {
          if (uid === 0) {
            return Promise.resolve(DEFAULT_SALDO_DATA)
          }

          return api.getDeposit(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Saldo] Error getting saldo data: ${error}`)

          return Promise.resolve(DEFAULT_SALDO_DATA)
        })
}

module.exports = getSaldo
