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
    curr_page: { type: new GraphQLNonNull(GraphQLInt) },
    per_page: { type: new GraphQLNonNull(GraphQLInt) },
    max_page: { type: new GraphQLNonNull(GraphQLInt) },
    items: { type: new GraphQLList(HotlistType) }
  }
})

module.exports = HotlistsType
