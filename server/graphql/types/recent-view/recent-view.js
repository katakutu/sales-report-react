const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const RecentViewBadgeType = require('./recent-view-badge')
const RecentViewLabelType = require('./recent-view-label')

const RecentViewType = new GraphQLObjectType({
  name: 'RecentView',
  fields: {
    product_id: { type: new GraphQLNonNull(GraphQLID) },
    product_name: { type: new GraphQLNonNull(GraphQLString) },
    product_url: { type: new GraphQLNonNull(GraphQLURL) },
    product_image: { type: new GraphQLNonNull(GraphQLURL) },
    product_price: { type: new GraphQLNonNull(GraphQLString) },
    badges: { type: new GraphQLList(RecentViewBadgeType) },
    labels: { type: new GraphQLList(RecentViewLabelType) }
  }
})

const RecentViewsType = new GraphQLObjectType({
  name: 'RecentViews',
  fields: {
    total_data: { type: new GraphQLNonNull(GraphQLInt) },
    items: { type: new GraphQLList(RecentViewType) }
  }
})

module.exports = { RecentViewType, RecentViewsType }
