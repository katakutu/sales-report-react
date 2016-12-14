const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const TickerType = require('./ticker')
const TickerMetaDataType = require('./ticker-metadata')

const TickersType = new GraphQLObjectType({
  name: 'Tickers',
  fields: {
    meta: { type: new GraphQLNonNull(TickerMetaDataType) },
    tickers: { type: new GraphQLList(TickerType) }
  }
})

module.exports = TickersType
