const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const RecommendationLabelType = new GraphQLObjectType({
  name: 'RecommendationLabel',
  fields: {
    title: { type:  new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = RecommendationLabelType
