const {
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { FeedsType } = require('../../types/feed/feed')
const { RecommendationsType } = require('../../types/recommendation/recommendation')
const { RecentViewsType } = require('../../types/recent-view/recent-view')
const { getFeeds, getRecommendations, getRecentViews } = require('../../models/feed')

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

const userRecentViewQuery = {
  type: RecentViewsType,
  args: {
    userID: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getRecentViews(args.userID)
  }
}

module.exports = {
  'get_feed': { 'get_feed': userFeedQuery },
  'get_recommendation': { 'get_recommendation': userRecommendationQuery },
  'get_recent_view': { 'get_recent_view': userRecentViewQuery }
}
