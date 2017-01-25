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
    mutation removeFavorite($productID: Int!, $userID: Int!) {
      favorite_remove(productID: $productID, userID: $userID)
    }
  `,
  addFavorite: gql`
    mutation addFavorite($productID: Int!, $userID: Int!) {
      favorite_add(productID: $productID, userID: $userID)
    }
  `
}

export default {
  Wishlist: Wishlist,
  Favorite: Favorite
}
