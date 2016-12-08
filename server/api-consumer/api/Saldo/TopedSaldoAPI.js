const TopedAPI = require('..//TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')

const SALDO_SERVICES = {
  GetDeposit: `${GlobalConfig.Saldo.Hostname}/deposit/get/:user_id?type=usable`
}

class TopedSaldoAPI {

  constructor () {
    this.api = new TopedAPI()
  }

  getDeposit (userID) {
    let url = new URL(SALDO_SERVICES.GetDeposit.replace(':user_id', userID))

    return this.api.consume(url, 'GET', {}, true)
  }
}

module.exports = TopedSaldoAPI
