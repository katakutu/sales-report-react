const hotlists = require('./hotlist')
const slide = require('./slide')
const ticker = require('./ticker')
const user = require('./user')

let queries = {}

queries = Object.assign({}, queries, hotlists)
queries = Object.assign({}, queries, slide)
queries = Object.assign({}, queries, ticker)
queries = Object.assign({}, queries, user)

module.exports = queries
