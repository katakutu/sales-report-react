const { GraphicSalesTypes } = require('../../../types/graphic_sales')
const { getGraphicData } = require('../../../models/sales-report')

const GraphicSalesQuery = {
  type: GraphicSalesTypes,
  args: { },
  resolve: function (_, args) {
    return getGraphicData()
  }
}

module.exports = GraphicSalesQuery
