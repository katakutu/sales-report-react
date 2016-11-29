import TopedAPI from 'lib/api/TopedAPI'
import config from 'lib/api/config'

class TopedLiteAuthAPI {
  static URL = {
    GetUserInfo: `http://${config.Lite.Hostname}/userinfo`
  }

  constructor () {
    this.api = new TopedAPI()
  }

  getUserInfo () {
    let url = new URL(TopedLiteAuthAPI.URL.GetUserInfo)

    return this.api.consume(url, 'GET', {}, true)
  }
}

export default TopedLiteAuthAPI
