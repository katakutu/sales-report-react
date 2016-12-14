const { GraphQLString } = require('graphql')

const HotlistsType = require('../../types/hotlists')
const getHotlists = require('../../models/hotlist')

const HotlistsQuery = {
  type: HotlistsType,
  args: { action: { type: GraphQLString } },
  resolve: function (_, args) {
    return getHotlists(args.action)
  }
}

module.exports = HotlistsQuery
