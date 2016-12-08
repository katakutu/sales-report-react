import TopedAPI from 'lib/api/TopedAPI'
import config from 'lib/api/config'

const ACE_SERVICES = {
  searchCatalog: `https://${config.Ace.Hostname}/search/v1/catalog`,
  searchShop: `https://${config.Ace.Hostname}/search/v1/shop`,
  spellCheck: `https://${config.Ace.Hostname}/v1/products/spellcheck`,
  priceRange: `https://${config.Ace.Hostname}/v1/price_range`, // /v1/price_range/[catalog_id]
  catalogShopList: `https://${config.Ace.Hostname}/search/v1/catalog/product`,
  popularSearch: `https://${config.Ace.Hostname}/v1/popular_search`,
  recentSearch: `https://${config.Ace.Hostname}/recent_search/v1`,
  dynamicAttributes: `https://${config.Ace.Hostname}/v1/dynamic_attributes`,
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
    let url = new URL(TopedAceAPI.URL.Autocomplete);

    return this.api.consume(url, 'GET', content)
  }

  /**
   * To search for catalogss in Tokopedia you can use Ace with GET request through /search/v1/catalog endpoint.
   */
  searchCatalog (query, categoryIds = '', catalogIds = '') {
    let content = {
      q: query,
      sc: categoryIds,
      id: catalogIds,
      device: 'mobile'
    }

    return this.api.consume(ACE_SERVICES.searchShop, 'GET', content);
  }

  searchShop (query, isAllMerchant = true) {
    let content = {
      q: query,
      fshop: isAllMerchant ? 1 : 2
    };

    return this.api.consume(ACE_SERVICES.searchShop, 'GET', content);
  }

  spellCheck (query, count = 1, correction = false) {
    let content = {
      q: query,
      count: 1,
      correction: ''
    }

    return this.api.consumeGet(ACE_SERVICES.spellCheck, content);
  }

  priceRange () {

  }

  catalogShopList () {

  }

  PopularSearch () {

  }

  recentSearch () {

  }
}

export default TopedAceAPI
