const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const TopAdsShopProductType = new GraphQLObjectType({
  name: 'TopAdslistShopProduct',
  fields: {
    product_id: { type: new GraphQLNonNull(GraphQLID) },
    product_name: { type: new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = TopAdsShopProductType
