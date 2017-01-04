const category = require('./category')
const hotlists = require('./hotlist')
const search = require('./search')
const slide = require('./slide')
const ticker = require('./ticker')
const toppicks = require('./toppicks')
const user = require('./user')

let queries = {}

queries = Object.assign({}, queries, category)
queries = Object.assign({}, queries, hotlists.hot_product_home)
queries = Object.assign({}, queries, hotlists.hot_product_list)
queries = Object.assign({}, queries, search)
queries = Object.assign({}, queries, slide)
queries = Object.assign({}, queries, ticker)
queries = Object.assign({}, queries, toppicks)
queries = Object.assign({}, queries, user)

module.exports = queries
