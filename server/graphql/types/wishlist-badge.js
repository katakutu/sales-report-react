const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const WishlistBadgeType = new GraphQLObjectType({
  name: 'WishlistBadge',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = WishlistBadgeType
