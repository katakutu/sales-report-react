const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const AUTH_SERVICE = {
  GetUserInfo: `${GlobalConfig.Lite.Hostname}/userinfo`
}

class TopedLiteAuthAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getUserInfo () {
    let url = URL.parse(AUTH_SERVICE.GetUserInfo)

    return this.api.consume(url, 'GET', {}, true)
  }
}

module.exports = TopedLiteAuthAPI
