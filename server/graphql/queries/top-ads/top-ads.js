const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { TopAdslistsType } = require('../../types/top-ads/top-ads')
const getTopsAds = require('../../models/top-ads')

const userTopAdsQuery = {
  type: TopAdslistsType,
  args: {
    userID: { type: GraphQLInt },
    ep: { type: GraphQLString },
    src: { type: GraphQLString },
    item: { type: GraphQLInt },
    page: { type: GraphQLInt },
    q: { type: GraphQLString }
  },
  resolve: function (_, args, context) {
    return getTopsAds(args.userID, args.ep, args.src, args.item, args.page, args.q, context)
  }
}

module.exports = userTopAdsQuery
