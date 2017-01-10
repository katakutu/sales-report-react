const {
    TopedShopAPI,
    DEFAULT_SHOP_DATA
} = require('./../../api-consumer/api/Shop/TopedShopAPI')
const common = require('./common')

function getShop (context) {
  const userID = common.getUserID(context)
  const api = new TopedShopAPI()

  return userID
        .then(uid => {
          return api.getShop(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Shop] Error getting shop data: ${error}`)

          return Promise.resolve(DEFAULT_SHOP_DATA)
        })
}

module.exports = getShop
