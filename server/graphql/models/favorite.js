const {
  TopedFavoriteAPI,
  DEFAULT_FAVE_DATA
} = require('./../../api-consumer/api/Favorite/TopedFavoriteAPI')
const common = require('./common')

function getFavorite (context) {
  const userID = common.getUserID(context)
  return userID.then(uid => {
    if (uid === 0) {
      return Promise.resolve(DEFAULT_FAVE_DATA)
    }
    const api = new TopedFavoriteAPI()

    return api.getFavorite(uid).then(response => {
      if (!response || !response['data']) {
        return Promise.resolve(DEFAULT_FAVE_DATA)
      }
      return response['data'].map(section => {
        return {
          shop_id: section['shop'].id,
          shop_name: section['shop'].name,
          domain: section['shop'].domain,
          shop_url: section['shop'].uri,
          is_gold: section['shop'].gold_shop,
          is_official: section['shop'].shop_is_official,
          location: section['shop'].location,
          city: section['shop'].city,
          products: section['shop'].image_product.map(row => {
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

module.exports = {
  getFavorite: getFavorite
}
