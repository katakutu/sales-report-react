const { TopPicksType } = require('../../types/toppick')
const getTopPicks = require('../../models/toppicks')

const toppickQuery = {
  type: TopPicksType,
  args: {},
  resolve: function (_, args) {
    return getTopPicks()
  }
}

module.exports = toppickQuery
