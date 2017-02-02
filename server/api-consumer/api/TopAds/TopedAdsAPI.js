const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

let param = 'ep=:ep&src=:src&item=:item&page=:page&q=:q&user_id=:user_id&device=mobile'
const TOPADS_SERVICES = {
  Display: `${GlobalConfig.Fave.Hostname}/promo/v1.1/display/ads?${param}`
}

/**
 * A class that give us the ticker information in homepage.
 *
 * @class TopedAdsAPI
 */
class TopedAdsAPI {
  /**
   * Creates an instance of TopedAdsAPI. *
   * @memberOf TopedAdsAPI
   */
  constructor () {
    this.api = new TopedAPI()
  }

  getTopAds (userID, ep = '', src = '', item = 2, page = 1, q = '', sessID) {
    const sidCookie = `${GlobalConfig['Cookie']['SessionID']}=${sessID};`
    const endpoint = TOPADS_SERVICES.Display
                                    .replace(':ep', ep)
                                    .replace(':src', src)
                                    .replace(':item', item)
                                    .replace(':page', page)
                                    .replace(':q', q)
                                    .replace(':user_id', userID)
    const headers = {
      'Cookie': sidCookie
    }
    return this.api.consume(URL.parse(endpoint), 'GET', {}, {
      headers: headers
    })
  }
}

module.exports = TopedAdsAPI
