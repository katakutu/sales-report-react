const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const SALDO_SERVICES = {
  GetDeposit: `${GlobalConfig.Saldo.Hostname}/deposit/get/:user_id?type=usable`
}

const DEFAULT_SALDO_DATA = { deposit_fmt: 'ERROR FAIL' }

class TopedSaldoAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getDeposit (userID) {
    let url = URL.parse(SALDO_SERVICES.GetDeposit.replace(':user_id', userID))

    return this.api.consume(url, 'GET', {}, true)
      .catch(err => {
        console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)
        return DEFAULT_SALDO_DATA
      })
  }
}

module.exports = {
  DEFAULT_SALDO_DATA: DEFAULT_SALDO_DATA,
  TopedSaldoAPI: TopedSaldoAPI
}
