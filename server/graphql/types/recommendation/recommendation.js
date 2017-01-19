const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const RecommendationBadgeType = require('./recommendation-badge')
const RecommendationShopType = require('./recommendation-shop')
const RecommendationLabelType = require('./recommendation-label')

const RecommendationType = new GraphQLObjectType({
  name: 'Recommendation',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) },
    price: { type: new GraphQLNonNull(GraphQLString) },
    shop: { type: new GraphQLNonNull(RecommendationShopType) },
    badges: { type: new GraphQLList(RecommendationBadgeType) },
    labels: { type: new GraphQLList(RecommendationLabelType) }
  }
})

const RecommendationsType = new GraphQLObjectType({
  name: 'Recommendations',
  fields: {
    size_data: { type: new GraphQLNonNull(GraphQLInt) },
    source: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(RecommendationType) }
  }
})

module.exports = { RecommendationType, RecommendationsType }
