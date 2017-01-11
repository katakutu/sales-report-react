const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const WishlistReputationType = require('./wishlist-reputation')

const WishlistShopType = new GraphQLObjectType({
  name: 'WishlistShop',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    reputation: { type: new GraphQLNonNull(WishlistReputationType) },
    official_store: { type: new GraphQLNonNull(GraphQLBoolean) },
    gold_merchant: { type: new GraphQLNonNull(GraphQLBoolean) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = WishlistShopType
