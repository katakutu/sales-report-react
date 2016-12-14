const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const MOJITO_SERVICES = {
  Ticker: `${GlobalConfig.Mojito.Hostname}/api/v1/tickers`,
  Slides: `${GlobalConfig.Mojito.Hostname}/api/v1/slides`
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
      'user_id': userid,
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'action': action
    }
    let url = URL.parse(MOJITO_SERVICES.Ticker)

    return this.api.consume(url, 'GET', content)
  }

  /**
   * Get slides for frontpage
   *
   * @param {number} pageSize How many images you want to get for one page
   * @param {number} deviceFilter What devide is these images accessed from.
   * @param {number} targetFilter Target devices
   * @param {number} stateFilter Target state
   * @param {number} expiredFilter Expired filter
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedMojitoAPI
   */
  getSlides (pageSize, deviceFilter, targetFilter, stateFilter, expiredFilter) {
    let content = {
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'filter[target]': targetFilter,
      'filter[state]': stateFilter,
      'filter[expired]': expiredFilter
    }
    let url = URL.parse(MOJITO_SERVICES.Slides)

    return this.api.consume(url, 'GET', content)
  }
}

module.exports = TopedMojitoAPI
