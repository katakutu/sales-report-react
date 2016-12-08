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
  dynamicAttributes: `https://${config.Ace.Hostname}/v1/dynamic_attributes`
}

class TopedAceAPI {
  static URL = {
    Universe: `https://${config.Ace.Hostname}/universe/v2`,
    Autocomplete: `https://${config.Ace.Hostname}/v1/products/autocomplete`
  }

  constructor () {
    this.api = new TopedAPI()
  }

  /**
   * Gather all autocomplete information
   */
  universeSearch (query = '', uniqueID) {
    let content = {
      'q': query,
      'unique_id': uniqueID
    }
    let url = new URL(TopedAceAPI.URL.Universe)

    return this.api.consume(url, 'GET', content)
  }

  /**
   * API client for autocomplete
   */
  autocomplete (query, numOfResult = 10) {
    let content = {
      'q': query,
      'count': numOfResult
    }
    let url = new URL(TopedAceAPI.URL.Autocomplete)

    return this.api.consume(url, 'GET', content)
  }

  /**
   * Search Catalog API client
   */
  searchCatalog (query, categoryIds = '', catalogIds = '') {
    let content = {
      q: query,
      sc: categoryIds,
      id: catalogIds,
      device: 'mobile'
    }

    return this.api.consume(ACE_SERVICES.searchShop, 'GET', content)
  }

  /**
   * Search Shop API client
   */
  searchShop (query, isAllMerchant = true) {
    let content = {
      q: query,
      fshop: isAllMerchant ? 1 : 2
    }

    return this.api.consume(ACE_SERVICES.searchShop, 'GET', content)
  }

  /**
   * API client for spellcheck
   */
  spellCheck (query, count = 1, correction = false) {
    let content = {
      q: query,
      count: 1,
      correction: ''
    }

    return this.api.consumeGet(ACE_SERVICES.spellCheck, content)
  }

  priceRange (catalogId) {
    // NOTE: Need available params docs
    return this.api.consumeGet(`${ACE_SERVICES.priceRange}/${catalogId}`, { maximum_price: 10000000, minimum_price: 10000 })
  }

  /**
   * API client to get list of shops and products from catalog
   */
  catalogShopList (categoryId, isNew = true, locations, isPreorder = false) {
    let content = {
      ctg_id: categoryId,
      condition: isNew ? 1 : 2,
      floc: locations,
      preorder: isPreorder,
      device: 'mobile'
    }

    return this.api.consumeGet(ACE_SERVICES.catalogShopList, content)
  }

  /**
   * Popular keyword on search
   */
  popularSearch (count = 10) {
    let content = {
      count: count
    }
    return this.api.consumeGet(ACE_SERVICES.popularSearch, content)
  }

  /**
   * Recent keyword searched by user
   */
  recentSearch (uniqueId, count = 10) {
    // TODO: implement DELETE and PUT request
    let content = {
      unique_id: uniqueId,
      count: count
    }

    return this.api.consumeGet(ACE_SERVICES.recentSearch, content)
  }

  /**
   * Dynamic attributes such as filter and sort
   */
  dynamicAttributes () {
    // TODO: Implement this
  }
}

export default TopedAceAPI
