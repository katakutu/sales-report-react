const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const SlideType = require('./slide')
const MetaDataType = require('./metadata')

const SlidesType = new GraphQLObjectType({
  name: 'Slides',
  fields: {
    meta: { type: new GraphQLNonNull(MetaDataType) },
    slides: { type: new GraphQLList(SlideType) }
  }
})

module.exports = SlidesType
