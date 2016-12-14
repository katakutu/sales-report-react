const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType
 } = require('graphql')

const TickerMetaDataType = new GraphQLObjectType({
  name: 'TickerMetaData',
  fields: {
    total_data: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = TickerMetaDataType
