const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HOTLIST_SERVICES = {
  GetHotProductHome: `${GlobalConfig.Hotlist.Hostname}?action=hot_product_home`,
  GetHotProductList: `${GlobalConfig.Hotlist.Hostname}?action=hot_product_list&page=:page&perPage=:per_page`
}

class TopedHotlistAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getHotProductHome () {
    const url = URL.parse(HOTLIST_SERVICES.GetHotProductHome)

    return this.api.consume(url, 'GET', {})
      .catch(err => {
        console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)
        return {}
      })
  }

  GetHotProductList (page = 1, perPage = 9) {
    const endpoint = HOTLIST_SERVICES.GetHotProductList
                                     .replace(':page', page)
                                     .replace(':per_page', perPage)
    const url = URL.parse(endpoint)

    return this.api.consume(url, 'GET', {})
      .catch(err => {
        console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)

        return {}
      })
  }
}

module.exports = TopedHotlistAPI
