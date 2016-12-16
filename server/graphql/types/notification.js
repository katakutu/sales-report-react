const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const NotifData = require('./notif-data')

const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: {
    status: { type: GraphQLString },
    data: { type: NotifData }
  }
})

module.exports = NotificationType
