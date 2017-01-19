const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const RecentViewLabelType = new GraphQLObjectType({
  name: 'RecentViewLabel',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = RecentViewLabelType
