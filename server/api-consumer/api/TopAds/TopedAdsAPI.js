const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const TOPADS_SERVICES = {
  Display: `${GlobalConfig.Fave.Hostname}/promo/v1.1/display/ads?ep=:ep&src=:src&item=:item&page=:page&q=:q`
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
    const endpoint = TOPADS_SERVICES.Display
                                    .replace(':ep', ep)
                                    .replace(':src', src)
                                    .replace(':item', item)
                                    .replace(':page', page)
                                    .replace(':q', q)
    let header = {
      'X-Tkpd-UserId': userID,
      'X-Tkpd-SessionId': sessID,
      'X-Device': 'mobile'
    }
    return this.api.consume(URL.parse(endpoint), 'GET', {}, {
      headers: header
    })
  }
}

module.exports = TopedAdsAPI
