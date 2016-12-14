const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const PointsAttributesType = new GraphQLObjectType({
  name: 'PointsAttributes',
  fields: {
    amount_formatted: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = PointsAttributesType
