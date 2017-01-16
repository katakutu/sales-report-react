import gql from 'graphql-tag'

const Wishlist = {
  removeWishlist: gql`
      mutation removeWishlist($productID: Int!, $userID: Int!) {
        wishlist(productID: $productID, userID: $userID)
      }
    `
}

export default {
  Wishlist: Wishlist
}
