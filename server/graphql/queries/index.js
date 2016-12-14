const ticker = require('./ticker')
const slide = require('./slide')

let queries = {}

queries = Object.assign({}, queries, ticker)
queries = Object.assign({}, queries, slide)

module.exports = queries
