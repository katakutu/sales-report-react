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

const WishlistShopType = require('./wishlist-shop')

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
    condition: { type: new GraphQLNonNull(GraphQLString) },
    shop: { type: new GraphQLNonNull(WishlistShopType) },
    available: { type: new GraphQLNonNull(GraphQLBoolean) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: new GraphQLNonNull(GraphQLInt) }
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
