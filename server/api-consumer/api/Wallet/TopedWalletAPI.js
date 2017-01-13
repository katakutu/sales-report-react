const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HOSTNAME = GlobalConfig['Accounts']['Hostname']
const HOSTNAME_SERVICES = {
  WalletBalance: `${HOSTNAME}/api/wallet/balance`
}

const DEFAULT_WALLET_DATA = {
  linked: false,
  balance: 'Rp 0',
  errors: []
}

class TopedWalletAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getWalletBalance (origin, sid) {
    const url = URL.parse(HOSTNAME_SERVICES.WalletBalance)
    const sidCookie = `${GlobalConfig['Cookie']['SessionID']}=${sid};`
    const headers = {
      'Cookie': sidCookie,
      'Origin': origin
    }
    const opt = { headers: headers }

    return this.api.consume(url, 'GET', {}, opt)
               .then(response => {
                 return {
                   linked: !!+response['data']['link'],
                   balance: response['data']['balance'] || 'Rp 0',
                   errors: []
                 }
               })
               .catch(err => {
                 console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)

                 const finalMessage = `${err}, url: ${url.format()}, c: ${sidCookie}, o: ${origin}`
                 return Object.assign(DEFAULT_WALLET_DATA, {
                   errors: [{ name: 'ERRFAILED', message: finalMessage }]
                 })
               })
  }
}

module.exports = {
  DEFAULT_WALLET_DATA: DEFAULT_WALLET_DATA,
  TopedWalletAPI: TopedWalletAPI
}
