const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt
} = require('graphql')

const NotifSalesType = new GraphQLObjectType({
  name: 'NotifSales',
  fields: {
    sales_new_order: { type: new GraphQLNonNull(GraphQLInt) },
    sales_shipping_status: { type: new GraphQLNonNull(GraphQLInt) },
    sales_shipping_confirm: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = NotifSalesType
