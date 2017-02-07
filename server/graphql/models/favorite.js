const {
  TopedFavoriteAPI,
  DEFAULT_FAVE_DATA
} = require('./../../api-consumer/api/Favorite/TopedFavoriteAPI')
const GlobalConfig = require('./../../GlobalConfig')
const api = new TopedFavoriteAPI()

function removeFavorite (userID, shopID, token, context, adkey) {
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'

  const test = api.removeFavorite(userID, shopID, token, sessID, adkey)
  return test
}

function addFavorite (userID, shopID, token, context, adkey) {
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'
  const test = api.addFavorite(userID, shopID, token, sessID, adkey)
  return test
}

function getCSRF (context) {
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'
  return api.getCSRFToken(
      context.read('Origin') || GlobalConfig['Hostname'],
      sessID
  ).catch(error => {
    console.error(`[GraphQL][Models][Wallet] Error getting wallet data: ${error}`)
    return Promise.resolve(DEFAULT_FAVE_DATA)
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
      if (response['pagination'] !== undefined && response['pagination'] !== null) {
        response['pagination'] = !!response['pagination']['next']
      } else {
        response['pagination'] = false
      }
      return {
        has_next_page: response['pagination'],
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
    })
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
  getShopID: getShopID
}
