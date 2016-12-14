const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType
 } = require('graphql')

const MetaDataType = new GraphQLObjectType({
  name: 'MetaData',
  fields: {
    total_data: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = MetaDataType
