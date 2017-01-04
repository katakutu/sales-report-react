const { OfficialStoresType } = require('../../types/official-store')
const getOfficialStores = require('../../models/official-store')

const getOfficialStoresQuery = {
  type: OfficialStoresType,
  args: {},
  resolve: function (_, args) {
    return getOfficialStores()
  }
}

module.exports = getOfficialStoresQuery
