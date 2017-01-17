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

export default {
  Wishlist: Wishlist
}
