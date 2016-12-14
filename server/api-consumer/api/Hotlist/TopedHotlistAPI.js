const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HOTLIST_SERVICES = {
  Get: `${GlobalConfig.Hotlist.Hostname}?action=:action`
}

class TopedHotlistAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getHotlists (action = 'hot_product_home') {
    let url = URL.parse(HOTLIST_SERVICES.Get.replace(':action', action))

    console.log(url.format())

    return this.api.consume(url, 'GET', {}, true)
      .catch(err => {
        console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)
        return {}
      })
  }
}

module.exports = TopedHotlistAPI
