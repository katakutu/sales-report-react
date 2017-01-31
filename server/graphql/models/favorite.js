const {
  TopedFavoriteAPI,
  DEFAULT_FAVE_DATA
} = require('./../../api-consumer/api/Favorite/TopedFavoriteAPI')
const common = require('./common')
const api = new TopedFavoriteAPI()

function removeFavorite (userID, shopID) {
  return api.removeFavorite(userID, shopID)
}

function addFavorite (userID, shopID, adKey) {
  return api.addFavorite(userID, shopID, adKey)
}

function getPromoted (context) {
  const userID = common.getUserID(context)
  return userID.then(uid => {
    if (uid === 0) {
      return Promise.resolve(DEFAULT_FAVE_DATA)
    }
    const api = new TopedFavoriteAPI()

    return api.getPromote(uid).then(response => {
      if (!response || !response['data']) {
        return Promise.resolve(DEFAULT_FAVE_DATA)
      }
      return response['data'].map(section => {
        const imageProducts = section.image_product || []
        return {
          shop_id: section.id,
          shop_name: section.name,
          domain: section.domain,
          shop_url: section.uri,
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
    )
      .catch(error => {
        return {
          favorite: Promise.resolve(DEFAULT_FAVE_DATA),
          errors: [error.name, error.message]
        }
      })
  })
}

function getFavorited (userID, query, count, page) {
  if (userID === 0) {
    return Promise.resolve(DEFAULT_FAVE_DATA)
  }
  const api = new TopedFavoriteAPI()

  return api.getPromote(userID).then(response => {
    if (!response || !response['data']) {
      return Promise.resolve(DEFAULT_FAVE_DATA)
    }
    return response['data'].map(section => {
      const imageProducts = section.image_product || []
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
    )
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
  getPromoted: getPromoted,
  getFavorited: getFavorited,
  removeFavorite: removeFavorite,
  addFavorite: addFavorite,
  getShopID: getShopID
}
