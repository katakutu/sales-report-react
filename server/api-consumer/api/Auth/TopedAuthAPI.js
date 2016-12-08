const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const ACCOUNTS_SERVICE = {
  Info: `${GlobalConfig['Accounts']['Hostname']}/info`
}

class TopedAuthAPI {
  constructor (oauthToken, oauthTokenType) {
    this.api = new TopedAPI()
    this.token = oauthToken
    this.tokenType = oauthTokenType
  }

  getUserInfo () {
    let url = URL.parse(ACCOUNTS_SERVICE.Info)

    return this.api.consumeOAuth(url, 'GET', this.token, this.tokenType, {}, true)
  }
}

module.exports = TopedAuthAPI
