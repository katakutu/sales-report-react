import TopedAPI from 'lib/api/TopedAPI'

/**
 * A class that give us the ticker information in homepage.
 *
 * @class TopedTickersAPI
 */
class TopedTickersAPI {
  /**
   * @static List of URLs available for this API
   *
   * @memberOf TopedTickersAPI
   */
  static URL = {
    Ticker: 'https://mojito.tokopedia.com/api/v1/tickers'
  }

  /**
   * Creates an instance of TopedTickersAPI. *
   * @memberOf TopedTickersAPI
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
   * @memberOf TopedTickersAPI
   */
  getTickers (userid, pageSize, deviceFilter, action) {
    let content = {
      'user_id': userid,
      'page[size]': pageSize,
      'filter[device]': deviceFilter,
      'action': action
    }
    let url = new URL(TopedTickersAPI.URL.Ticker)

    return this.api.consume(url, 'GET', content)
  }
}

export default TopedTickersAPI
