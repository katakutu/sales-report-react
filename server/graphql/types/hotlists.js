const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const HotlistType = require('./hotlist')

const HotlistsType = new GraphQLObjectType({
  name: 'Hotlists',
  fields: {
    message_status: { type: new GraphQLNonNull(GraphQLInt) },
    success: { type: new GraphQLNonNull(GraphQLInt) },
    max_page: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLList(HotlistType) }
  }
})

module.exports = HotlistsType
