const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const params = `/promo/v1/display/shops?src=fav_shop&item=2&view_type=fav_shop&user_id=:user_id&device=mobile`
const FAVORITE_SERVICES = {
  GetPromoteShop: `${GlobalConfig.Fave.Hostname}` + params
}
const DEFAULT_FAVE_DATA = {
  shop_id: 'ERROR FAIL',
  shop_url: 'ERROR FAIL',
  domain: 'ERROR FAIL',
  shop_name: 'ERROR FAIL',
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

  getPromote (userID) {
    let url = URL.parse(FAVORITE_SERVICES.GetPromoteShop.replace(':user_id', userID))
    return this.api.consume(url, 'GET', {})
  }
}

module.exports = {
  DEFAULT_FAVE_DATA: DEFAULT_FAVE_DATA,
  TopedFavoriteAPI: TopedFavoriteAPI
}
