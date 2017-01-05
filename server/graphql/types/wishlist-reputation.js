const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const WishlistReputationType = new GraphQLObjectType({
  name: 'WishlistReputation',
  fields: {
    score: { type:  new GraphQLNonNull(GraphQLInt) },
    set: { type: new GraphQLNonNull(GraphQLString) },
    level: { type: new GraphQLNonNull(GraphQLInt) },
    image: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = WishlistReputationType
