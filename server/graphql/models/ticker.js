const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

function getTicker () {
  const api = new TopedMojitoAPI()

  return api.getTickers(0, 50, 'desktop', 'data_source_filter').then(response => {
    const responseMeta = response['meta']
    const resultMeta = (Object.keys(responseMeta).length > 0 && responseMeta.constructor === Object)
      ? responseMeta
      : { total_data: response['data']['tickers'].length }

    return { meta: resultMeta, tickers: response['data']['tickers'] }
  })
}

module.exports = getTicker
