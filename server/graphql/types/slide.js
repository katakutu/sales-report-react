const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const SlideType = new GraphQLObjectType({
  name: 'Slide',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) },
    redirect_url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

module.exports = SlideType
