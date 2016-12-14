const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt
} = require('graphql')

const NotifPurchaseType = new GraphQLObjectType({
  name: 'NotifPurchase',
  fields: {
    purchase_reorder: { type: new GraphQLNonNull(GraphQLInt) },
    purchase_payment_conf: { type: new GraphQLNonNull(GraphQLInt) },
    purchase_payment_confirm: { type: new GraphQLNonNull(GraphQLInt) },
    purchase_order_status: { type: new GraphQLNonNull(GraphQLInt) },
    purchase_delivery_confirm: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = NotifPurchaseType
