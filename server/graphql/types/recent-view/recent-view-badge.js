const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const RecentViewBadgeType = new GraphQLObjectType({
  name: 'RecentViewBadge',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = RecentViewBadgeType
