const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt
} = require('graphql')

const NotifInboxType = new GraphQLObjectType({
  name: 'NotifInbox',
  fields: {
    inbox_talk: { type: new GraphQLNonNull(GraphQLInt) },
    inbox_ticket: { type: new GraphQLNonNull(GraphQLInt) },
    inbox_review: { type: new GraphQLNonNull(GraphQLInt) },
    inbox_friend: { type: new GraphQLNonNull(GraphQLInt) },
    inbox_wishlist: { type: new GraphQLNonNull(GraphQLInt) },
    inbox_message: { type: new GraphQLNonNull(GraphQLInt) },
    inbox_reputation: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

module.exports = NotifInboxType
