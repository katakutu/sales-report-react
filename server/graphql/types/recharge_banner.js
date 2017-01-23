const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const RechargeBannerType = new GraphQLObjectType({
  name: 'RechargeBanner',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    image_url: { type: new GraphQLNonNull(GraphQLString) },
    redirect_url: { type: new GraphQLNonNull(GraphQLString) },
    subtitle: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const RechargeBannersType = new GraphQLList(RechargeBannerType)

module.exports = { RechargeBannerType, RechargeBannersType }
