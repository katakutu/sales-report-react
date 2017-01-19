const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const TopAdsShopType = require('./top-ads-shop')
const TopAdsProductType = require('./top-ads-product')

const TopAdslistType = new GraphQLObjectType({
  name: 'TopAd',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ad_ref_key: { type: new GraphQLNonNull(GraphQLString) },
    redirect: { type: new GraphQLNonNull(GraphQLURL) },
    sticker_id: { type:GraphQLID },
    sticker_image: { type: GraphQLURL },
    product_click_url: { type: GraphQLURL },
    shop_click_url: { type: new GraphQLNonNull(GraphQLURL) },
    product: { type: TopAdsProductType },
    shop: { type: new GraphQLNonNull(TopAdsShopType) }
  }
})

const TopAdslistsType = new GraphQLObjectType({
  name: 'TopAds',
  fields: {
    total_data: { type: new GraphQLNonNull(GraphQLInt) },
    display: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(TopAdslistType) }
  }
})

module.exports = { TopAdslistsType, TopAdslistType }
