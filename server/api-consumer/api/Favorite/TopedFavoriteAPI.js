const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const params = `/v1/web-service/fav_shop/list?user_id=:user_id&per_page=:per_page&p=:page&shop_name=:shop`
const FAVORITE_SERVICES = {
  GetFaveShop: `${GlobalConfig.Tome.Hostname}` + params,
  FavoriteModification: `${GlobalConfig.WS.Hostname}` + `/v4/action/favorite-shop/fav_shop.pl`,
  GetCSRFToken: `${GlobalConfig.Tome.Hostname}` + `/v1/user/token`
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

  getFavorite (userID, perPage = 10, page = 1, shopName = '') {
    let url = URL.parse(FAVORITE_SERVICES.GetFaveShop
                                         .replace(':user_id', userID)
                                         .replace(':per_page', perPage)
                                         .replace(':page', page)
                                         .replace(':shop', shopName))
    return this.api.consume(url, 'GET', {})
  }
  getCSRFToken (origin, sessID) {
    const sidCookie = `${GlobalConfig['Cookie']['SessionID']}=${sessID};`
    let url = URL.parse(FAVORITE_SERVICES.GetCSRFToken)
    const headers = {
      'Cookie': sidCookie,
      'Origin': origin
    }
    const opt = { headers: headers }
    return this.api.consume(url, 'GET', {}, opt)
  }
  removeFavorite (userID, shopID, adKey) {
    const url = URL.parse(FAVORITE_SERVICES.FavoriteModification)
    const content = {
      'user_id': userID,
      'shop_id': shopID,
      'ad_key': adKey,
      'src': 'fav_shop'
    }
    // const header = {
    //   'X-User-ID': userID,
    //   'X-Device': 'lite'
    // }
    return this.api.consume(url, 'POST', content)
    // return this.HMACApi.consumeJSON(URL.parse(endpoint), 'DELETE', header, content)
    //                    .then(response => response.statusCode === 204)
    //                    .catch(err => {
    //                      console.error(`[Favorite][Favorite][Delete] API call returning error: ${err}`)

    //                      return false
    //                    })
  }

  addFavorite (userID, shopID, adKey) {
    const url = URL.parse(FAVORITE_SERVICES.FavoriteModification)
    const content = {
      'user_id': userID,
      'shop_id': shopID,
      'ad_key': adKey,
      'src': 'fav_shop'
    }
    // const header = {
    //   'X-User-ID': userID,
    //   'X-Device': 'lite'
    // }
    return this.api.consume(url, 'POST', content)
    // return this.HMACApi.consumeJSON(URL.parse(endpoint), 'POST', header, content)
    //                    .then(response => response.statusCode === 201)
    //                    .catch(err => {
    //                      console.error(`[Tome][Favorite][Add] API call returning error: ${err}`)

    //                      return false
    //                    })
  }
}

module.exports = {
  DEFAULT_FAVE_DATA: DEFAULT_FAVE_DATA,
  TopedFavoriteAPI: TopedFavoriteAPI
}
