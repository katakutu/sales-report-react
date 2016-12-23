const TickersType = require('../../types/tickers')
const getTicker = require('../../models/ticker')

const tickerQuery = {
  type: TickersType,
  args: {},
  resolve: function (_, args, context) {
    return getTicker(context)
  }
}

module.exports = tickerQuery
