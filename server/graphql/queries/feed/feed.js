const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { FeedsType } = require('../../types/feed/feed')
const { RecommendationsType } = require('../../types/recommendation/recommendation')
const { getFeeds, getRecommendations } = require('../../models/feed')

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

const userRecommendationQuery = {
  type: RecommendationsType,
  args: {
    userId: { type: GraphQLInt },
    recommendationSource: { type: GraphQLString },
    recommendationSize: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getRecommendations(args.userId, args.recommendationSource, args.recommendationSize)
  }
}

module.exports = {
  'get_feed': { 'get_feed': userFeedQuery },
  'get_recommendation': { 'get_recommendation': userRecommendationQuery }
}
