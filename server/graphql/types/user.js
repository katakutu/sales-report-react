const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLEmail } = require('graphql-custom-types')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    isLoggedIn: { type: new GraphQLNonNull(GraphQLBoolean) },
    shouldRedirect: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLEmail },
    profilePicture: { type: GraphQLString }
  }
})

module.exports = UserType
