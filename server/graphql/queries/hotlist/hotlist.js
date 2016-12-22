const { GraphQLInt } = require('graphql')

const HotlistsType = require('../../types/hotlists')
const { getHotProductHome, getHotProductList } = require('../../models/hotlist')

const HotProductListsQuery = {
  type: HotlistsType,
  args: {
    page: { type: GraphQLInt },
    per_page: { type: GraphQLInt }
  },
  resolve: function (_, args) {
    return getHotProductList(args.page, args.per_page)
  }
}

const HotProductHomeQuery = {
  type: HotlistsType,
  args: { },
  resolve: function (_, args) {
    return getHotProductHome()
  }
}

module.exports = {
  'hot_product_home': { 'hot_product_home': HotProductHomeQuery },
  'hot_product_list': { 'hot_product_list': HotProductListsQuery }
}
