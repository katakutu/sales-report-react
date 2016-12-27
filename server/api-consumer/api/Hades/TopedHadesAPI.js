const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HADES_SERVICES = {
  AllCategories: `${GlobalConfig.Hades.Hostname}/v1/categories?filter=type%3D%3Dlist%3Blevel%3D%3D1`
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
