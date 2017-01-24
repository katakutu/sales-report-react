const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const TopAdsBadgesType = new GraphQLObjectType({
  name: 'TopAdsBadge',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = TopAdsBadgesType
