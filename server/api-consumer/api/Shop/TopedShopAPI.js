const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const SHOP_SERVICES = {
  GetShop: `${GlobalConfig.Tome.Hostname}/v1/shop/user_shop_info?user_id=:user_id`
}

const DEFAULT_SHOP_DATA = {
  shop_id: 'ERROR FAIL',
  shop_url: 'ERROR FAIL',
  domain: 'ERROR FAIL',
  shop_name: 'ERROR FAIL',
  shop_name_unfmt: 'ERROR FAIL',
  shop_name_clean: 'ERROR FAIL',
  is_gold: '0',
  is_official: '0',
  location: 'ERROR FAIL',
  logo: 'ERROR FAIL',
  shop_badge: 'ERROR FAIl'
}

class TopedShopAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getShop (userID) {
    let url = URL.parse(SHOP_SERVICES.GetShop.replace(':user_id', userID))

    return this.api.consume(url, 'GET', {})
      .catch(err => {
        console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)
        return DEFAULT_SHOP_DATA
      })
  }
}

module.exports = {
  DEFAULT_SHOP_DATA: DEFAULT_SHOP_DATA,
  TopedShopAPI: TopedShopAPI
}
