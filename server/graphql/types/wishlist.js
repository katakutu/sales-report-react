const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const WishlistBadgeType = require('./wishlist-badge')
const WishlistLabelType = require('./wishlist-label')
const WishlistShopType = require('./wishlist-shop')
const WishlistWholesaleType = require('./wishlist-wholesale')

const WishlistType = new GraphQLObjectType({
  name: 'Wishlist',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    image: { type: new GraphQLNonNull(GraphQLURL) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    price_formatted: { type: new GraphQLNonNull(GraphQLString) },
    minimum_order: { type: new GraphQLNonNull(GraphQLInt) },
    wholesale_price: { type: new GraphQLList(WishlistWholesaleType) },
    condition: { type: new GraphQLNonNull(GraphQLString) },
    shop: { type: new GraphQLNonNull(WishlistShopType) },
    badges: { type: new GraphQLList(WishlistBadgeType) },
    labels: { type: new GraphQLList(WishlistLabelType) },
    available: { type: new GraphQLNonNull(GraphQLBoolean) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    preorder: { type: new GraphQLNonNull(GraphQLBoolean) }
  }
})

const WishlistsType = new GraphQLObjectType({
  name: 'Wishlists',
  fields: {
    total_data: { type: new GraphQLNonNull(GraphQLInt) },
    items: { type: new GraphQLList(WishlistType) }
  }
})

module.exports = { WishlistType, WishlistsType }
