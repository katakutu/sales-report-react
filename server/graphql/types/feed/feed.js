const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const FeedBadgeType = require('./feed-badge')
const FeedShopType = require('./feed-shop')
const FeedLabelType = require('./feed-label')

const FeedType = new GraphQLObjectType({
  name: 'Feed',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) },
    image_url_700: { type: new GraphQLNonNull(GraphQLURL) },
    price: { type: new GraphQLNonNull(GraphQLString) },
    shop: { type: new GraphQLNonNull(FeedShopType) },
    badges: { type: new GraphQLList(FeedBadgeType) },
    labels: { type: new GraphQLList(FeedLabelType) }
  }
})

const FeedsType = new GraphQLObjectType({
  name: 'Feeds',
  fields: {
    total_data: { type: new GraphQLNonNull(GraphQLInt) },
    items: { type: new GraphQLList(FeedType) }
  }
})

module.exports = { FeedType, FeedsType }
