const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const SHOP_SERVICES = {
  GetShop: `${GlobalConfig.Tome.Hostname}/v1/shop/user_shop_info?user_id=:user_id`
}

const DEFAULT_SHOP_DATA = {
  status: 'FAIL',
  data: {
    domain: 'ERROR FAIL',
    gold_shop: 'ERROR FAIL',
    id: 'ERROR FAIL',
    is_owner: 'ERROR FAIL',
    location: 'ERROR FAIL',
    lucky_shop: 'ERROR FAIL',
    nameowner_id: 'ERROR FAIL',
    uri: 'ERROR FAIL'
  }
}

class TopedShopAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  getShop (userID) {
    let url = URL.parse(SHOP_SERVICES.GetShop.replace(':user_id', userID))

    return this.api.consume(url, 'GET', {}, true)
      .catch(err => {
        console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)
        return DEFAULT_SHOP_DATA
      })
  }
}

module.exports = {
  DEFAULT_SHOP_DATA: DEFAULT_SHOP_DATA,
  TopedSaldoAPI: TopedShopAPI
}
