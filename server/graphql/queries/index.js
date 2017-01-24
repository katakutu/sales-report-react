const category = require('./category')
const hotlists = require('./hotlist')
const notifications = require('./notifications')
const officialStore = require('./official-store')
const points = require('./points')
const saldo = require('./saldo')
const search = require('./search')
const shop = require('./shop')
const slide = require('./slide')
const ticker = require('./ticker')
const toppicks = require('./toppicks')
const user = require('./user')
const wallet = require('./wallet')
const wishlist = require('./wishlist')
const topads = require('./top-ads')
const rechargeOperator = require('./recharge/operator')
const rechargeProduct = require('./recharge/product')
const rechargeCategory = require('./recharge/category')
const rechargeBanner = require('./recharge/banner')

let queries = {}

queries = Object.assign({}, queries, category)
queries = Object.assign({}, queries, hotlists.hot_product_home)
queries = Object.assign({}, queries, hotlists.hot_product_list)
queries = Object.assign({}, queries, notifications)
queries = Object.assign({}, queries, officialStore)
queries = Object.assign({}, queries, points)
queries = Object.assign({}, queries, saldo)
queries = Object.assign({}, queries, search)
queries = Object.assign({}, queries, shop)
queries = Object.assign({}, queries, slide)
queries = Object.assign({}, queries, ticker)
queries = Object.assign({}, queries, toppicks)
queries = Object.assign({}, queries, user)
queries = Object.assign({}, queries, wallet)
queries = Object.assign({}, queries, wishlist)
queries = Object.assign({}, queries, topads)
queries = Object.assign({}, queries, rechargeOperator)
queries = Object.assign({}, queries, rechargeProduct)
queries = Object.assign({}, queries, rechargeCategory)
queries = Object.assign({}, queries, rechargeBanner)

module.exports = queries
