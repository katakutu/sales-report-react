const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: {
    name: { type: GraphQLString },
    message: { type: GraphQLString }
  }
})

module.exports = ErrorType
