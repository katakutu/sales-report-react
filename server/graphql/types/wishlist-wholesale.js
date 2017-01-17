const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const WishlistWholesaleType = new GraphQLObjectType({
  name: 'WishlistWholesale',
  fields: {
    maximum: { type:  new GraphQLNonNull(GraphQLInt) },
    minimum: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = WishlistWholesaleType
