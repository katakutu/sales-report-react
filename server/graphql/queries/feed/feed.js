const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { FeedsType } = require('../../types/feed')
const { getFeeds } = require('../../models/feed')

const userFeedQuery = {
  type: FeedsType,
  args: {
    ob: { type: GraphQLInt },
    rows: { type: GraphQLInt },
    start: { type: GraphQLInt },
    shopId: { type: GraphQLString },
    uniquedId: { type: GraphQLString }
  },
  resolve: function (_, args) {
    return getFeeds(args.ob, args.rows, args.start, args.shopId, args.uniquedId)
  }
}

module.exports = userFeedQuery
