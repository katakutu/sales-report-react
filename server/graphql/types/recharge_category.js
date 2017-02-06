const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = require('graphql')

const RechargeCategoryType = new GraphQLObjectType({
  name: 'RechargeCategory',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: new GraphQLNonNull(GraphQLString) },
    validate_prefix: { type: new GraphQLNonNull(GraphQLBoolean) },
    instant_checkout_available: { type: new GraphQLNonNull(GraphQLBoolean) },
    default_operator_id: { type: new GraphQLNonNull(GraphQLString) },
    client_number: { type: new GraphQLObjectType({
      name: 'ClientNumber',
      fields: {
        is_shown: { type: new GraphQLNonNull(GraphQLBoolean) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        help: { type: new GraphQLNonNull(GraphQLString) },
        placeholder: { type: new GraphQLNonNull(GraphQLString) },
        operator_style: { type: new GraphQLNonNull(GraphQLString) }
      }
    }) },
    show_operator: { type: new GraphQLNonNull(GraphQLBoolean) },
    operator_label: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const RechargeCategoriesType = new GraphQLList(RechargeCategoryType)

module.exports = { RechargeCategoryType, RechargeCategoriesType }
