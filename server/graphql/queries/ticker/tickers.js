const { GraphQLInt } = require('graphql')

const tickerType = require('../../types/ticker')
const getTicker = require('../../models/ticker')

const tickerQuery = {
  type: tickerType,
  args: {
    id: {
      type: GraphQLInt
    }
  },
  resolve: function (_, args) {
    return getTicker(args.id)
  }
}

module.exports = tickerQuery
