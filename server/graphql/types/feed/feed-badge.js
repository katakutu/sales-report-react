const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const FeedBadgeType = new GraphQLObjectType({
  name: 'FeedBadge',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = FeedBadgeType
