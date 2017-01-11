const PointsType = require('../../types/points')
const getPoints = require('../../models/points')

const PointsQuery = {
  type: PointsType,
  args: {},
  resolve: function (_, args, context) {
    return getPoints(context)
  }
}

module.exports = PointsQuery
