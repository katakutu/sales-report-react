const { GraphQLInt } = require('graphql')

const TickersType = require('../../types/tickers')
const getTicker = require('../../models/ticker')

const tickerQuery = {
  type: TickersType,
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
