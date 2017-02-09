const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const ACE_SERVICES = {
  Autocomplete: `${GlobalConfig.Ace.Hostname}/v1/products/autocomplete`,
  CatalogShopList: `${GlobalConfig.Ace.Hostname}/search/v1/catalog/product`,
  DynamicAttributes: `${GlobalConfig.Ace.Hostname}/v1/dynamic_attributes`,
  HotListHome: `${GlobalConfig.Ace.Hostname}/hoth/hotlist/v1/home`,
  HotListPage: `${GlobalConfig.Ace.Hostname}/hoth/hotlist/v1/?page=:page&perPage=:per_page`,
  PopularSearch: `${GlobalConfig.Ace.Hostname}/v1/popular_search`,
  PriceRange: `${GlobalConfig.Ace.Hostname}/v1/price_range`, // /v1/price_range/[catalog_id]
  RecentSearch: `${GlobalConfig.Ace.Hostname}/recent_search/v1`,
  SearchCatalog: `${GlobalConfig.Ace.Hostname}/search/v1/catalog`,
  SearchShop: `${GlobalConfig.Ace.Hostname}/search/v1/shop`,
  SpellCheck: `${GlobalConfig.Ace.Hostname}/v1/products/spellcheck`,
  TopPicks: `${GlobalConfig.Ace.Hostname}/hoth/toppicks/widget?random=true&device=mobile&source=home`,
  Universe: `${GlobalConfig.Ace.Hostname}/universe/v3`,
  Feed: `${GlobalConfig.Ace.Hostname}/search/product/v3?source=feed&device=mobile&unique_id=:unique_id
  &shop_id=:shop_id&rows=:rows&start=:start&ob=:ob&`
}

class TopedAceAPI {
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
    let url = URL.parse(ACE_SERVICES.Universe)

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
    let url = URL.parse(ACE_SERVICES.Autocomplete)

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

    return this.api.consume(ACE_SERVICES.SearchShop, 'GET', content)
  }

  /**
   * Search Shop API client
   */
  searchShop (query, isAllMerchant = true) {
    let content = {
      q: query,
      fshop: isAllMerchant ? 1 : 2
    }

    return this.api.consume(ACE_SERVICES.SearchShop, 'GET', content)
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

    return this.api.consumeGet(ACE_SERVICES.SpellCheck, content)
  }

  priceRange (catalogId) {
    // NOTE: Need available params docs
    return this.api.consumeGet(`${ACE_SERVICES.PriceRange}/${catalogId}`, {
      maximum_price: 10000000,
      minimum_price: 10000
    })
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

    return this.api.consumeGet(ACE_SERVICES.CatalogShopList, content)
  }

  /**
   * Popular keyword on search
   */
  popularSearch (count = 10) {
    let content = {
      count: count
    }
    return this.api.consumeGet(ACE_SERVICES.PopularSearch, content)
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

    return this.api.consumeGet(ACE_SERVICES.RecentSearch, content)
  }

  topPicks () {
    const url = URL.parse(ACE_SERVICES.TopPicks)
    return this.api.consumeGet(url, {})
  }

  /**
   * Dynamic attributes such as filter and sort
   */
  dynamicAttributes () {
    // TODO: Implement this
  }

  getHotProductHome () {
    const url = URL.parse(ACE_SERVICES.HotListHome)

    return this.api.consume(url, 'GET', {
      'headers': { 'X-Device': 'lite' }
    })
  }

  getHotProductList (page = 1, perPage = 9) {
    const endpoint = ACE_SERVICES.HotListPage
                                 .replace(':page', page)
                                 .replace(':per_page', perPage)

    const url = URL.parse(endpoint)

    return this.api.consume(url, 'GET', {
      'headers': { 'X-Device': 'lite' }
    })
  }

  getFeed (ob = 2, rows = 12, start = 1, shopId, uniquedId) {
    const endpoint = ACE_SERVICES.Feed
                                 .replace(':start', start)
                                 .replace(':rows', rows)
                                 .replace(':ob', ob)
                                 .replace(':shop_id', shopId)
                                 .replace(':unique_id', uniquedId)

    const url = URL.parse(endpoint)

    return this.api.consume(url, 'GET', {
      'headers': { 'X-Device': 'lite' }
    })
  }
}

module.exports = TopedAceAPI
