const {
    TopedShopAPI,
    DEFAULT_SHOP_DATA
} = require('./../../api-consumer/api/Shop/TopedShopAPI')
const common = require('./common')

function getShop (context) {
  const userID = common.getUserID(context)

  return userID
        .then(uid => {
          if (uid === 0) {
            return Promise.resolve(DEFAULT_SHOP_DATA)
          }

          const api = new TopedShopAPI()

          return api.getShop(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Shop] Error getting shop data: ${error}`)

          return Promise.resolve(DEFAULT_SHOP_DATA)
        })
}

module.exports = getShop
