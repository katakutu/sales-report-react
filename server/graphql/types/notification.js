const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const NotifData = require('./notif-data')

const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    data: { type: new GraphQLNonNull(NotifData) }
  }
})

module.exports = NotificationType
