const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

const EMPTY_WISHLIST = {
  total_data: 0,
  items: []
}

function getUserWishlist (userID, query, count, page) {
  const api = new TopedMojitoAPI()

  return query === '' ?
    _getWishlist(api, userID, count, page) :
    _searchWishlist(api, userID, query)
}

function _searchWishlist(api, userID, query) {
  return api.filterWishlist(userID, query).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Mojito][Wishlist][Search] Wishlist API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_WISHLIST
    }

    return {
      total_data: response['header']['total_data'],
      items: response['data']
    }
  })
  .catch(err => {
      console.error(`[Mojito][Wishlist][Search] Wishlist API call faield. Cause: ${err.message}`)

      return EMPTY_WISHLIST
  })
}

function _getWishlist(api, userID, count, page) {
  return api.getWishlistProducts(userID, count, page).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Mojito][Wishlist][Get] Wishlist API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_WISHLIST
    }

    return {
      total_data: response['header']['total_data'],
      items: response['data']
    }
  })
    .catch(err => {
      console.error(`[Mojito][Wishlist][Get] Wishlist API call faield. Cause: ${err.message}`)

      return EMPTY_WISHLIST
    })
}

module.exports = getUserWishlist
