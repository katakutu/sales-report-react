const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')

const AUTH_SERVICE = {
  GetUserInfo: `${GlobalConfig.Lite.Hostname}/userinfo`
}

class TopedLiteAuthAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getUserInfo () {
    let url = new URL(AUTH_SERVICE.GetUserInfo)

    return this.api.consume(url, 'GET', {}, true)
  }
}

module.exports = TopedLiteAuthAPI
