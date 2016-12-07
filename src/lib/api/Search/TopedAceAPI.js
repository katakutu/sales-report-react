import TopedAPI from 'lib/api/TopedAPI'
import config from 'lib/api/config'

const aceServices = {
  SearchCatalog: `https://${config.Ace.Hostname}/search/v1/catalog`,
  SearchShop: `https://${config.Ace.Hostname}/search/v1/shop`,
  SpellCheck: `https://${config.Ace.Hostname}/v1/products/spellcheck`,
  PriceRange: `https://${config.Ace.Hostname}/v1/price_range`, // /v1/price_range/[catalog_id]
  CatalogShopList: `https://${config.Ace.Hostname}/search/v1/catalog/product`,
  PopularSearch: `https://${config.Ace.Hostname}/v1/popular_search`,
  RecentSearch: `https://${config.Ace.Hostname}/recent_search/v1`,
  DynamicAttributes: `https://${config.Ace.Hostname}/v1/dynamic_attributes`,
}

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
