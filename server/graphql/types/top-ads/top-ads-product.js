const {
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')
const TopAdsImageType = require('./top-ads-images')
const TopAdsLabelType = require('./top-ads-labels')

const TopAdsProductType = new GraphQLObjectType({
  name: 'TopAdslistProduct',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(TopAdsImageType) },
    uri: { type: new GraphQLNonNull(GraphQLURL) },
    relative_uri: { type: new GraphQLNonNull(GraphQLString) },
    price_format: { type: new GraphQLNonNull(GraphQLString) },
    count_talk_format: { type: new GraphQLNonNull(GraphQLString) },
    count_review_format: { type: new GraphQLNonNull(GraphQLString) },
    product_preorder: { type: new GraphQLNonNull(GraphQLBoolean) },
    product_wholesale: { type: new GraphQLNonNull(GraphQLBoolean) },
    free_return: { type: new GraphQLNonNull(GraphQLURL) },
    product_cashback: { type: new GraphQLNonNull(GraphQLBoolean) },
    product_cashback_rate: { type: new GraphQLNonNull(GraphQLString) },
    labels:  { type: new GraphQLList(TopAdsLabelType) }
  }
})

module.exports = TopAdsProductType
