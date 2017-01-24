const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const TopAdsLabelType = new GraphQLObjectType({
  name: 'TopAdslistLabel',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = TopAdsLabelType
