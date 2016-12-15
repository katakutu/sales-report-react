const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const SearchResultItemType = require('./search-result-item')

const SearchResultType = new GraphQLObjectType({
  name: 'SearchResult',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(SearchResultItemType) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = SearchResultType
