const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const NotifInbox = require('./notif-inbox')
const NotifPurchase = require('./notif-purchase')
const NotifSales = require('./notif-sales')

const NotifDataType = new GraphQLObjectType({
  name: 'NotificationData',
  fields: {
    sales: { type: new GraphQLNonNull(NotifSales) },
    inbox: { type: new GraphQLNonNull(NotifInbox) },
    purchase: { type: new GraphQLNonNull(NotifPurchase) },
    total_notif: { type: new GraphQLNonNull(GraphQLInt) },
    total_cart: { type: new GraphQLNonNull(GraphQLInt) },
    incr_notif: { type: GraphQLInt },
    resolution: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = NotifDataType
