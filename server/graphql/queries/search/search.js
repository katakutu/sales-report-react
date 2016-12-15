const {
    GraphQLList,
    GraphQLString
} = require('graphql')

const SearchResultType = require('../../types/search-result')
const universalSearch = require('../../models/search')

const SearchQuery = {
  type: new GraphQLList(SearchResultType),
  args: {
      query: { type: GraphQLString },
      userSearchID: { type: GraphQLString }
  },
  resolve: function (_, args) {
    return universalSearch(args.userSearchID, args.query)
  }
}

module.exports = SearchQuery
