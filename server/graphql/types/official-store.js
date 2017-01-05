const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const OfficialStoreType = new GraphQLObjectType({
  name: 'OfficialStore',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    logo_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

const OfficialStoresType = new GraphQLList(OfficialStoreType)

module.exports = { OfficialStoreType, OfficialStoresType }
