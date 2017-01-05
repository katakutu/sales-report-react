const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

const EMPTY_WISHLIST = {
    total_data: 0,
    items: []
}

function getUserWishlist (userID, count, page) {
    const api = new TopedMojitoAPI()

    return api.getWishlistProducts(userID, count, page).then(response => {
        if (!response['data']) {
            const raw = JSON.stringify(response)
            console.error(`[Mojito][Wishlist] Wishlist API calls returns no usual data. Raw data: ${raw}`)

            return EMPTY_WISHLIST
        }

        return {
            total_data: response['header']['total_data'],
            items: response['data']
        }
    })
    .catch(err => {
      console.error(`[Mojito][Wishlist] Wishlist API call faield. Cause: ${err.message}`)

      return EMPTY_WISHLIST
    })
}

module.exports = getUserWishlist