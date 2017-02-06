const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const RechargeProductType = new GraphQLObjectType({
  name: 'RechargeProduct',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    category_id: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: new GraphQLNonNull(GraphQLInt) },
    operator_id: { type: new GraphQLNonNull(GraphQLInt) },
    price_plain: { type: new GraphQLNonNull(GraphQLInt) },
    desc: { type: new GraphQLNonNull(GraphQLString) },
    detail: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLString) },
    promo: { type: new GraphQLObjectType({
      name: 'Promo',
      fields: {
        bonus_text: { type: new GraphQLNonNull(GraphQLString) },
        new_price: { type: new GraphQLNonNull(GraphQLString) }
      }
    }) }
  }
})

const RechargeProductsType = new GraphQLList(RechargeProductType)

module.exports = { RechargeProductType, RechargeProductsType }
