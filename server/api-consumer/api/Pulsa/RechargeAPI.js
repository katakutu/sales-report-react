const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const PULSA_SERVICES = {
  OperatorList: `${GlobalConfig.Recharge.Hostname}/v1.1/operator/list`,
  ProductList: `${GlobalConfig.Recharge.Hostname}/v1.1/product/list?device_id=4`,
  CategoryList: `${GlobalConfig.Recharge.Hostname}/v1.1/category/list?device_id=4`,
  PrefixList: `${GlobalConfig.Recharge.Hostname}/prefix/list`,
  BannerList: `${GlobalConfig.Recharge.Hostname}/v1.1/banner/list?device_id=2`
}

/**
 * A class that give us the ticker information in homepage.
 *
 * @class TopedTickersAPI
 */
class RechargeAPI {
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
  getOperatorList () {
    let url = URL.parse(PULSA_SERVICES.OperatorList)
    return this.api.consume(url, 'GET', {})
  }
  getProductList () {
    let url = URL.parse(PULSA_SERVICES.ProductList)
    return this.api.consume(url, 'GET', {})
  }
  getCategoryList () {
    let url = URL.parse(PULSA_SERVICES.CategoryList)
    return this.api.consume(url, 'GET', {})
  }
  getPrefixList () {
    let url = URL.parse(PULSA_SERVICES.PrefixList)
    return this.api.consume(url, 'GET', {})
  }
  getBannerList () {
    let url = URL.parse(PULSA_SERVICES.BannerList)
    return this.api.consume(url, 'GET', {})
  }
}

module.exports = RechargeAPI
