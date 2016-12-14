const {
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const PointsAttributes = require('./points-attributes')

const PointsDataType = new GraphQLObjectType({
  name: 'PointsData',
  fields: {
    attributes: { type: new GraphQLNonNull(PointsAttributes) }
  }
})

module.exports = PointsDataType
