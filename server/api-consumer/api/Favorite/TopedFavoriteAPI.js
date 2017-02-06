const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const params = `/v1/web-service/fav_shop/list?user_id=:user_id&per_page=:per_page&p=:page&shop_name=:shop`
const FAVORITE_SERVICES = {
  GetFaveShop: `${GlobalConfig.Tome.Hostname}` + params,
  FavoriteModification: `${GlobalConfig.Tome.Hostname}` + `/shop/favorite-shop`,
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
  removeFavorite (userID, shopID, adKey, sessID) {
    const sidCookie = `${GlobalConfig['Cookie']['SessionID']}=${sessID};`
    const url = URL.parse(FAVORITE_SERVICES.FavoriteModification)
    const content = {
      'user_id': userID,
      'shop_id': shopID,
      'token': adKey,
      'src': 'fav_shop'
    }
    const headers = {
      'Cookie': sidCookie
    }
    const opt = { headers: headers }
    return this.api.consumeForm(url, 'POST', content, opt)
  }

  addFavorite (userID, shopID, adKey, sessID) {
    const sidCookie = `${GlobalConfig['Cookie']['SessionID']}=${sessID};`
    const url = URL.parse(FAVORITE_SERVICES.FavoriteModification)
    const content = {
      'user_id': userID,
      'shop_id': shopID,
      'ad_key': adKey,
      'src': 'fav_shop'
    }
    const headers = {
      'Cookie': sidCookie
    }
    const opt = { headers: headers }
    return this.api.consumeForm(url, 'POST', content, opt)
  }
}

module.exports = {
  DEFAULT_FAVE_DATA: DEFAULT_FAVE_DATA,
  TopedFavoriteAPI: TopedFavoriteAPI
}
