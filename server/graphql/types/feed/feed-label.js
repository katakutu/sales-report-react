const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const FeedLabelType = new GraphQLObjectType({
  name: 'FeedLabel',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = FeedLabelType
