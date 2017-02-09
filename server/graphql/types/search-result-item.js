const {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const SearchResultItemType = new GraphQLObjectType({
  name: 'SearchResultItem',
  fields: {
    imageURI: { type: new GraphQLNonNull(GraphQLString) },
    keyword: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    official: { type: new GraphQLNonNull(GraphQLBoolean) },
    promoted: { type: new GraphQLNonNull(GraphQLBoolean) },
    recom: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = SearchResultItemType
