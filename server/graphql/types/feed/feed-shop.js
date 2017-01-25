const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const FeedShopType = new GraphQLObjectType({
  name: 'FeedShop',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    is_gold: { type: new GraphQLNonNull(GraphQLBoolean) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    reputation: { type: new GraphQLNonNull(GraphQLURL) },
    clover: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = FeedShopType
