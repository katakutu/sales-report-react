const {
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const TopAdsImageType = new GraphQLObjectType({
  name: 'TopAdslistImage',
  fields: {
    m_ecs: { type: new GraphQLNonNull(GraphQLURL) },
    s_ecs: { type: new GraphQLNonNull(GraphQLURL) },
    xs_ecs: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = TopAdsImageType
