const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const RechargeCategoryType = new GraphQLObjectType({
  name: 'RechargeCategory',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const RechargeCategoriesType = new GraphQLList(RechargeCategoryType)

module.exports = { RechargeCategoryType, RechargeCategoriesType }
