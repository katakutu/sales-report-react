const {
  TopedFavoriteAPI,
  DEFAULT_FAVE_DATA
} = require('./../../api-consumer/api/Favorite/TopedFavoriteAPI')
const common = require('./common')

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
        const imageProducts = section['shop'].image_product || []
        return {
          shop_id: section['shop'].id,
          shop_name: section['shop'].name,
          domain: section['shop'].domain,
          shop_url: section['shop'].uri,
          shop_url2: section['shop_click_url'],
          is_gold: section['shop'].gold_shop,
          is_official: section['shop'].shop_is_official,
          location: section['shop'].location,
          city: section['shop'].city,
          img_shop:  {
            cover: section['shop']['image_shop']['cover'],
            s_url: section['shop']['image_shop']['s_url'],
            xs_url: section['shop']['image_shop']['xs_url'],
            cover_ecs: section['shop']['image_shop']['cover_ecs'],
            s_ecs: section['shop']['image_shop']['s_ecs'],
            xs_ecs: section['shop']['image_shop']['xs_ecs']
          },
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

function getFavorited (context) {
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
        const imageProducts = section['shop'].image_product || []
        return {
          shop_id: section['shop'].id,
          shop_name: section['shop'].name,
          domain: section['shop'].domain,
          shop_url: section['shop'].uri,
          shop_url2: section['shop_click_url'],
          is_gold: section['shop'].gold_shop,
          is_official: section['shop'].shop_is_official,
          location: section['shop'].location,
          city: section['shop'].city,
          img_shop:  {
            cover: section['shop']['image_shop']['cover'],
            s_url: section['shop']['image_shop']['s_url'],
            xs_url: section['shop']['image_shop']['xs_url'],
            cover_ecs: section['shop']['image_shop']['cover_ecs'],
            s_ecs: section['shop']['image_shop']['s_ecs'],
            xs_ecs: section['shop']['image_shop']['xs_ecs']
          },
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

module.exports = {
  getPromoted: getPromoted,
  getFavorited: getFavorited
}
