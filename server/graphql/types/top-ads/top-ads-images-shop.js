const {
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const TopAdsImageShopType = new GraphQLObjectType({
  name: 'TopAdslistImageShop',
  fields: {
    cover_ecs: { type: new GraphQLNonNull(GraphQLURL) },
    s_ecs: { type: new GraphQLNonNull(GraphQLURL) },
    xs_ecs: { type: new GraphQLNonNull(GraphQLURL) },
    s_url: { type: new GraphQLNonNull(GraphQLURL) },
    xs_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = TopAdsImageShopType
