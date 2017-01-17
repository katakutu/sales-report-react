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

const FeedType = new GraphQLObjectType({
  name: 'Feed',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    image: { type: new GraphQLNonNull(GraphQLURL) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    shop: { type: new GraphQLNonNull(FeedShopType) },
    badges: { type: new GraphQLList(FeedBadgeType) }
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
