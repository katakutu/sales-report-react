const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')
const TopAdsImageShopType = require('./top-ads-images-shop')

const TopAdsShopType = new GraphQLObjectType({
  name: 'TopAdslistShop',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    domain: { type: new GraphQLNonNull(GraphQLString) },
    tagline: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    image_shop: { type: new GraphQLNonNull(TopAdsImageShopType) },
    gold_shop: { type: new GraphQLNonNull(GraphQLBoolean) },
    lucky_shop: { type: new GraphQLNonNull(GraphQLURL) },
    shop_is_official: { type: new GraphQLNonNull(GraphQLBoolean) },
    uri: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = TopAdsShopType
