const {
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const PointsData = require('./points-data')

const PointsType = new GraphQLObjectType({
  name: 'Points',
  fields: {
    data: { type: new GraphQLNonNull(PointsData) }
  }
})

module.exports = PointsType
