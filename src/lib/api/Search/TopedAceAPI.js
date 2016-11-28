import TopedAPI from 'lib/api/TopedAPI'
import config from 'lib/api/config'

class TopedAceAPI {
  static URL = {
    Universe: `https://${config.Ace.Hostname}/universe/v2`,
    Autocomplete: `https://${config.Ace.Hostname}/v1/products/autocomplete`
  }

  constructor () {
    this.api = new TopedAPI()
  }

  universeSearch (query = '', uniqueID) {
    let content = {
      'q': query,
      'unique_id': uniqueID
    }
    let url = new URL(TopedAceAPI.URL.Universe)

    return this.api.consume(url, 'GET', content)
  }

  autocomplete (query, numOfResult = 10) {
    let content = {
      'q': query,
      'count': numOfResult
    }
    let url = new URL(TopedAceAPI.URL.Autocomplete)

    return this.api.consume(url, 'GET', content)
  }
}

export default TopedAceAPI
