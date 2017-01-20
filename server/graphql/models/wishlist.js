const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

const EMPTY_WISHLIST = {
  has_next_page: false,
  items: [],
  total_data: 0
}

function removeWishlist (userID, productID) {
  const api = new TopedMojitoAPI()

  return api.removeWishlist(userID, productID)
}

function addWishlist (userID, productID) {
  const api = new TopedMojitoAPI()

  return api.addWishlist(userID, productID)
}

function getUserWishlist (userID, query, count, page) {
  const api = new TopedMojitoAPI()

  return query === ''
    ? _getWishlist(api, userID, count, page)
    : _searchWishlist(api, userID, query, count, page)
}

function _searchWishlist (api, userID, query, count, page) {
  return api.filterWishlist(userID, query, count, page).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Mojito][Wishlist][Search] Wishlist API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_WISHLIST
    }

    return {
      has_next_page: !!response['pagination'],
      items: response['data'],
      total_data: response['header']['total_data']
    }
  })
  .catch(err => {
    console.error(`[Mojito][Wishlist][Search] Wishlist API call faield. Cause: ${err.message}`)

    return EMPTY_WISHLIST
  })
}

function _getWishlist (api, userID, count, page) {
  return api.getWishlistProducts(userID, count, page).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Mojito][Wishlist][Get] Wishlist API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_WISHLIST
    }

    return {
      has_next_page: !!response['pagination'],
      items: response['data'],
      total_data: response['header']['total_data']
    }
  })
    .catch(err => {
      console.error(`[Mojito][Wishlist][Get] Wishlist API call faield. Cause: ${err.message}`)

      return EMPTY_WISHLIST
    })
}

module.exports = {
  addWishlist,
  getUserWishlist,
  removeWishlist
}
