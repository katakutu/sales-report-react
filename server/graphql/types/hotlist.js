const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const HotlistType = new GraphQLObjectType({
  name: 'HotList',
  fields: {
    title_enc: { type: new GraphQLNonNull(GraphQLString) },
    price_start_from: { type: new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) },
    url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = HotlistType
