const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const RecommendationBadgeType = new GraphQLObjectType({
  name: 'RecommendationBadge',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = RecommendationBadgeType
