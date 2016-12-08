const TopedHMACAPI = require('../TopedHMACAPI')
const GlobalConfig = require('../../../GlobalConfig')

const HOTLIST_SERVICE = {
  HotList: `${GlobalConfig.WS.Hostname}/v4/hotlist/get_hotlist.pl`
}

/**
 * Class that consumes APIs related to HotList.
 *
 * @class TopedHotListAPI
 */
class TopedHotListAPI {
    /**
     * Creates an instance of TopedHotListAPI.
     *
     * @param {string} apiKey the API Key for TokopediaHotList API
     *
     * @memberOf TopedHotListAPI
     */
  constructor (apiKey) {
    this.api = new TopedHMACAPI(apiKey)
  }

    /**
     * Get product hot list.
     *
     * @param {number} page The page number of the data we want to show.
     * @param {number} perPage How much data per page we want to show.
     * @param {string} query Filter query for the data we want to show.
     * @returns {Promise<Object>} A promise of object returned from the API.
     *
     * @memberOf TopedHotListAPI
     */
  getHotList (page, perPage, query) {
    const url = HOTLIST_SERVICE.HotList
    const content = {
      'page': page,
      'per_page': perPage,
      'query': query,
      'bypass_hmac': 1,
      'bypass_hash': 1,
      'device_id': 'b'
    }

    return this.api.consume('FORM', new URL(url), 'POST', content).then(response => {
      return response.json()
    })
  }
}

module.exports = TopedHotListAPI
