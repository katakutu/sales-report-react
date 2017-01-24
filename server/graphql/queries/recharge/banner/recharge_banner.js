const { RechargeBannersType } = require('../../../types/recharge_banner')
const { getBannerList } = require('../../../models/recharge')

const RechargeBannerQuery = {
  type: RechargeBannersType,
  args: { },
  resolve: function (_, args) {
    return getBannerList()
  }
}

module.exports = RechargeBannerQuery
