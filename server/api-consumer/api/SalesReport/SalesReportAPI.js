const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const SALESREPORT_SERVICES = {
  GraphicData: `${GlobalConfig.SalesReport.Hostname}/v1.1/operator/list`,
  TableData: `${GlobalConfig.SalesReport.Hostname}/v1.1/operator/list`
}

/**
 * A class that give us the ticker information in homepage.
 *
 * @class TopedTickersAPI
 */
class SalesReportAPI {
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
  getGraphicData () {
    let url = URL.parse(SALESREPORT_SERVICES.GraphicData)
    return this.api.consume(url, 'GET', {})
  }
  getTableData () {
    let url = URL.parse(SALESREPORT_SERVICES.TableData)
    return this.api.consume2(url, 'GET', {})
  }
}

module.exports = SalesReportAPI
