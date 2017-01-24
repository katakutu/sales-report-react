const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = require('graphql')

const RechargeOperatorType = new GraphQLObjectType({
  name: 'RechargeOperator',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    weight: { type: new GraphQLNonNull(GraphQLInt) },
    default_product_id: { type: new GraphQLNonNull(GraphQLInt) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    show_product_list: { type: new GraphQLNonNull(GraphQLBoolean) }
  }
})

const RechargeOperatorsType = new GraphQLList(RechargeOperatorType)

module.exports = { RechargeOperatorType, RechargeOperatorsType }
