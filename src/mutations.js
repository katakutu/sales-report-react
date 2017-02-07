import gql from 'graphql-tag'

const Wishlist = {
  removeWishlist: gql`
    mutation removeWishlist($productID: Int!, $userID: Int!) {
      wishlist_remove(productID: $productID, userID: $userID)
    }
  `,
  addWishlist: gql`
    mutation addWishlist($productID: Int!, $userID: Int!) {
      wishlist_add(productID: $productID, userID: $userID)
    }
  `
}

const Favorite = {
  removeFavorite: gql`
    mutation removeFavorite($shopID: Int!, $userID: Int!, $token: String!, $adRefKey: String) {
      favorite_remove(shopID: $shopID, userID: $userID, token: $token, adKey: $adRefKey)
    }
  `,
  addFavorite: gql`
    mutation addFavorite($shopID: Int!, $userID: Int!, $token: String!, $adRefKey: String) {
      favorite_add(shopID: $shopID, userID: $userID, token: $token, adKey: $adRefKey)
    }
  `
}

export default {
  Wishlist: Wishlist,
  Favorite: Favorite
}
