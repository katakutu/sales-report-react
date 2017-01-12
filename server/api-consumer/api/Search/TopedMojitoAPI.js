const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const MOJITO_SERVICES = {
  Ticker: `${GlobalConfig.Mojito.Hostname}/api/v1/tickers`,
  Slides: `${GlobalConfig.Mojito.Hostname}/api/v1/slides`,
  Category: `${GlobalConfig.Mojito.Hostname}/api/v1/layout/category`,
  OfficialStores: `${GlobalConfig.Mojito.OfficialStoreHostname}/os/api/v1/brands/list?device=lite`,
  WishlistProductList: `${GlobalConfig.Mojito.Hostname}/v1.0.2/users/:user_id/wishlist/products?count=:count&page=:page`
}

/**
 * A class that give us the ticker information in homepage.
 *
 * @class TopedMojitoAPI
 */
class TopedMojitoAPI {
  /**
   * Creates an instance of TopedMojitoAPI. *
   * @memberOf TopedMojitoAPI
   */
  constructor () {
    this.api = new TopedAPI()
  }

  getCategory () {
    let url = URL.parse(MOJITO_SERVICES.Category)

    return this.api.consume(url, 'GET', {})
  }

  /**
   * Get new tickers notification
   *
   * @param {string} userid The user_id. 0 if anonymous.
   * @param {number} pageSize How many tickers info you want in one page.
   * @param {string} deviceFilter What device is this info accessed from.
   * @param {string} action The Action.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedMojitoAPI
   */
  getTickers (userid, pageSize, deviceFilter, action) {
    let content = {
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'action': action
    }
    let url = URL.parse(MOJITO_SERVICES.Ticker)

    return this.api.consume(url, 'GET', content, {
      headers: { 'Tkpd-UserId': userid }
    })
  }

  /**
   * Get slides for frontpage
   *
   * @param {number} pageSize How many images you want to get for one page
   * @param {number} deviceFilter What device is these images accessed from.
   * @param {number} targetFilter Target devices
   * @param {number} stateFilter Target state
   * @param {number} expiredFilter Expired filter
   * @param {string} userid The user_id. 0 if anonymous.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedMojitoAPI
   */
  getSlides (pageSize, deviceFilter, targetFilter, stateFilter, expiredFilter, userid) {
    let content = {
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'filter[target]': targetFilter,
      'filter[state]': stateFilter,
      'filter[expired]': expiredFilter
    }
    let url = URL.parse(MOJITO_SERVICES.Slides)

    return this.api.consume(url, 'GET', content, {
      headers: { 'Tkpd-UserId': userid }
    })
  }

  getOfficialStores () {
    let url = URL.parse(MOJITO_SERVICES.OfficialStores)

    return this.api.consume(url, 'GET', {})
  }

  getWishlistProducts (userID, count = 10, page = 1) {
    const endpoint = MOJITO_SERVICES.WishlistProductList
                                    .replace(':user_id', userID)
                                    .replace(':count', count)
                                    .replace(':page', page)

    return this.api.consume(URL.parse(endpoint), 'GET', {})
  }
}

module.exports = TopedMojitoAPI
