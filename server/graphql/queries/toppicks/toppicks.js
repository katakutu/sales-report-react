const { TopPickGroupsType } = require('../../types/toppick')
const getTopPicks = require('../../models/toppicks')

const toppickQuery = {
  type: TopPickGroupsType,
  args: {},
  resolve: function (_, args) {
    return getTopPicks()
  }
}

module.exports = toppickQuery
