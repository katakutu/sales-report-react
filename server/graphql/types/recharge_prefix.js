const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const RechargePrefixType = new GraphQLObjectType({
  name: 'RechargePrefix',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    prefix: { type: new GraphQLNonNull(GraphQLString) },
  }
})

const RechargePrefixsType = new GraphQLList(RechargePrefixType)

module.exports = { RechargePrefixType, RechargePrefixsType }
