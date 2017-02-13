const SalesReportAPI = require('./../../api-consumer/api/SalesReport/SalesReportAPI')

const SALESREPORT_ERROR = []

function getGraphicData () {
  const api = new SalesReportAPI()

  return api.getGraphicData()
    .then(response => {
      return response.map(section => {
        return {
          sales: section['sales'],
          tx: section['tx']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge operator list: ${error.message}`)
      return SALESREPORT_ERROR
    })
}

function getTableData () {
  const api = new SalesReportAPI()

  return api.getTableData()
    .then(response => {
      return response.map(section => {
        return {
          name: section['name'],
          registration_number: section['registration']['number'],
          registration_rate: section['registration']['rate'],
          subscription_number: section['subscription']['number'],
          subscription_rate: section['subscription']['rate'],
          revenue_number: section['revenue']['number'],
          revenue_rate: section['revenue']['rate'],
          arpu_number: section['arpu']['number'],
          arpu_rate: section['arpu']['rate'],
          arppu_number: section['arppu']['number'],
          arppu_rate: section['arppu']['rate']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge operator list: ${error.message}`)
      return SALESREPORT_ERROR
    })
}

module.exports = {
  getGraphicData: getGraphicData,
  getTableData: getTableData
}
