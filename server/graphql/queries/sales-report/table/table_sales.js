const { TableSalesTypes } = require('../../../types/table_sales')
const { getTableData } = require('../../../models/sales-report')

const TableSalesQuery = {
  type: TableSalesTypes,
  args: { },
  resolve: function (_, args) {
    return getTableData()
  }
}

module.exports = TableSalesQuery
