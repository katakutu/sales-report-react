const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql')

const TickerType = require('./ticker')
const MetaDataType = require('./metadata')

const TickersType = new GraphQLObjectType({
  name: 'Tickers',
  fields: {
    meta: { type: new GraphQLNonNull(MetaDataType) },
    tickers: { type: new GraphQLList(TickerType) }
  }
})

module.exports = TickersType
