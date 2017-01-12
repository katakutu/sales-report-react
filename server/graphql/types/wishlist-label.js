const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const WishlistLabelType = new GraphQLObjectType({
  name: 'WishlistLabel',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = WishlistLabelType
