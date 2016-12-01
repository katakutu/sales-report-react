import TopedAPI from 'lib/api/TopedAPI'
import config from 'lib/api/config'

class TopedSaldoAPI {
  static URL = {
    GetDeposit: `${config.Saldo.Hostname}/deposit/get/:user_id?type=usable`
  }

  constructor () {
    this.api = new TopedAPI()
  }

  getDeposit (userID) {
    let url = new URL(TopedSaldoAPI.URL.GetDeposit.replace(':user_id', userID))

    return this.api.consume(url, 'GET', {}, true)
  }
}

export default TopedSaldoAPI
