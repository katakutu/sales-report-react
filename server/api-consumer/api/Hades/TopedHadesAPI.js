const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HADES_SERVICES = {
  AllCategories: `${GlobalConfig.Hades.Hostname}/v1/categories?filter=type==tree`
}

class TopedHadesAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  allCategories () {
    const url = URL.parse(HADES_SERVICES.AllCategories)

    return this.api.consume(url, 'GET', {})
  }
}

module.exports = TopedHadesAPI
