const {
  TopedFavoriteAPI,
  DEFAULT_FAVE_DATA
} = require('./../../api-consumer/api/Favorite/TopedFavoriteAPI')
const GlobalConfig = require('./../../GlobalConfig')
const common = require('./common')
const api = new TopedFavoriteAPI()

function removeFavorite (userID, shopID, token) {
  return api.removeFavorite(userID, shopID, token)
}

function addFavorite (userID, shopID, token) {
  return api.addFavorite(userID, shopID, token)
}

function getCSRF(context){
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || '_dYLTryTevwOUqXt6PBwlJpqwJX3QJuyedd_EKQ_OA6QR-WdvjDYCKY8EzCB1IjMpNu9TPm4444ZokXkPxk_bUlcloSzm1a37V40X5CxUvwj5lOSkMOt37x3vxh_evUD'
  return api.getCSRFToken(
      context.read('Origin') || GlobalConfig['Hostname'],
      sessID
  ).catch(error => {
    console.error(`[GraphQL][Models][Wallet] Error getting wallet data: ${error}`)
    return Promise.resolve(DEFAULT_WALLET_DATA)
  })
}
function getFavorited (userID, count, page, shop, context) {
  if (userID === 0) {
    return Promise.resolve(DEFAULT_FAVE_DATA)
  }
  
  return api.getFavorite(userID, count, page, shop).then(response => {
    if (!response || !response['data']) {
      return Promise.resolve(DEFAULT_FAVE_DATA)
    }
    return getCSRF(context).then(csrf => {
      return {
        token: csrf['data'],
        data: response['data'].map(section => {
          const imageProducts = section.shop_product || []
          return {
            shop_id: section.shop_id,
            shop_name: section.name,
            domain: section.domain,
            shop_url: section.shop_url,
            shop_pic: section.shop_picture,
            is_gold: section.is_gold_merchant,
            is_official: section.is_official,
            is_active: true,
            location: section.location,
            products: imageProducts.map(row => {
              return {
                id: row['product_id'],
                name: row['product_name'],
                img_url: row['image_url']
              }
            })
          }
        })
      }
    });
  })
  .catch(error => {
    return {
      favorite: Promise.resolve(DEFAULT_FAVE_DATA),
      errors: [error.name, error.message]
    }
  })
}

function getShopID (userID) {
  return getFavorited(userID, '', 50, 1)
    .then(ud => ud || 0)
    .catch(err => {
      console.error(`[GraphQL][Favorite][GetFavoritedShop] Failed to combine shop ID. Error: ${err}`)

      return 0
    })
}

module.exports = {
  getFavorited: getFavorited,
  removeFavorite: removeFavorite,
  addFavorite: addFavorite,
  getShopID: getShopID,
  getCSRF: getCSRF
}
