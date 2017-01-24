const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const params = `/v1/web-service/fav_shop/list?user_id=:user_id&per_page=:per_page&p=:page`
const FAVORITE_SERVICES = {
  GetPromoteShop: `${GlobalConfig.Tome.Hostname}` + params,
  FavoriteModification: `${GlobalConfig.Tome.Hostname}` + `/shop/favorite-shop`
}
const DEFAULT_FAVE_DATA = {
  shop_id: 'ERROR FAIL',
  shop_url: 'ERROR FAIL',
  domain: 'ERROR FAIL',
  shop_name: 'ERROR FAIL',
  shop_pic: 'ERROR FAIL',
  is_gold: '0',
  is_official: '0',
  location: 'ERROR FAIL',
  city: 'ERROR FAIL',
  products: []
}
class TopedFavoriteAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getPromote (userID, page = 1, per_page = 10) {
    let url = URL.parse(FAVORITE_SERVICES.GetPromoteShop
                                         .replace(':user_id', userID)
                                         .replace(':per_page', per_page)
                                         .replace(':page', page))
    return this.api.consume(url, 'GET', {})
  }
  removeFavorite (userID, productID) {
    const endpoint = FAVORITE_SERVICES.FavoriteModification
    const content = {
      'user_id': userID,
      'product_id': productID,
      'bypass_hmac': 1,
      'bypass_hash': 1,
      'device_id': 'b'
    }
    const header = {
      'X-User-ID': userID,
      'X-Device': 'lite'
    }

    return this.HMACApi.consumeJSON(URL.parse(endpoint), 'DELETE', header, content)
                       .then(response => response.statusCode === 204)
                       .catch(err => {
                         console.error(`[Favorite][Favorite][Delete] API call returning error: ${err}`)

                         return false
                       })
  }

  addFavorite (userID, productID) {
    const endpoint = FAVORITE_SERVICES.FavoriteModification.replace(':product_id', productID)
    const content = {
      'user_id': userID,
      'product_id': productID,
      'bypass_hmac': 1,
      'bypass_hash': 1,
      'device_id': 'b'
    }
    const header = {
      'X-User-ID': userID,
      'X-Device': 'lite'
    }

    return this.HMACApi.consumeJSON(URL.parse(endpoint), 'POST', header, content)
                       .then(response => response.statusCode === 201)
                       .catch(err => {
                         console.error(`[Tome][Favorite][Add] API call returning error: ${err}`)

                         return false
                       })
  }
}

module.exports = {
  DEFAULT_FAVE_DATA: DEFAULT_FAVE_DATA,
  TopedFavoriteAPI: TopedFavoriteAPI
}
